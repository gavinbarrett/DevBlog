const fs = require('fs');

exports.readPostFromDisk = async (req, res) => {
	const digest = req.query["digest"];
	if (validDigest(digest)) {
		const resp = await getPostFromDisk(digest);
		if (resp)
			res.send(JSON.stringify({"post": resp}));
		else
			res.send(JSON.stringify({"post": null}));
	} else
		res.send(JSON.stringify({"post": null}));
}

const validDigest = async (digest) => {
	// check for valid 256 bit hash
	return digest.match(/^[0-9a-f]{64}$/);
}

const getPostFromDisk = async (hash) => {
	const path = `./posts/${hash}.html`;
	return new Promise((resolve, reject) => {
		fs.access(path, fs.F_OK, err => {
			// file doesn't exist
			if (err) resolve(null);
			// try to read the file
			fs.readFile(path, 'base64', (err, data) => {
				if (err) resolve(null);
				// return the file contents
				resolve(data);
			});
		});
	});
}
