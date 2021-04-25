const database = require("./databaseUtilities.ts");
const fs = require('fs');

exports.readPostFromDisk = async (req, res) => {
	const digest = req.query["digest"];
	try {
		if (validDigest(digest)) {
			const resp = await getPostFromDisk(digest);
			resp ? res.send(JSON.stringify({"post": resp})) : res.send(JSON.stringify({"post": "failed"}));
		} else
			res.send(JSON.stringify({"post": "failed"}));
	} catch(err) {
		console.log(`Error: ${err}`);
		res.send(JSON.stringify({"post": "failed"}));
	}
}

exports.readAllPostsFromDisk = async (req, res) => {
	const query = `select * from posts order by post_time desc`;
	try {
		// query database
		const rows = await database.query(query);
		if (rows && rows.rows.length)
			res.send(JSON.stringify({"rows": rows.rows}));
		else
			res.send(JSON.stringify({"rows": "failed"}));
	} catch (err) {
		console.log(`Error: ${err}`);
		res.send(JSON.stringify({"rows": "failed"}));
	}
}

exports.getRecentPosts = async (req, res) => {
	const query = `select * from posts order by post_time desc`;
	try {
		// query database
		const rows = await database.query(query);
		if (rows && rows.rows.length) {
			// extract three most recent posts
			const slicedRows = rows.rows.slice(0, 3);
			res.send(JSON.stringify({"rows": slicedRows}));
		} else
			res.send(JSON.stringify({"rows": "failed"}));
	} catch (err) {
		console.log(`Error: ${err}`);
		res.send(JSON.stringify({"rows": "failed"}));
	}
}

exports.getQueriedPosts = async (req, res) => {
	const { query_regex } = req.params;
	try {
		if (query_regex.match(/([a-z0-9] ?)+/i)) {
			const query = `select * from posts where title ~* $1 or tags ~* $1`
			const values = [query_regex];
			const rows = await database.query(query, values);
			if (rows && rows.rows.length) {
				res.send(JSON.stringify({"rows": rows.rows}));
			} else
				res.send(JSON.stringify({"rows": "failed"}));
		} else
			throw "Invalid query";
	} catch (err) {
		console.log(`Error: ${err}`);
		res.send(JSON.stringify({"posts": "failed"}));
	}
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
