require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const { readPostFromDisk } = require("./database/diskUtilities.ts");
const database = require("./database/databaseUtilities.ts");

// FIXME: add disk utilities

// allow json parsing
app.use(express.json());
// server content from the /dist subdirectory
app.use(express.static("./dist"));
// disable X-Powered-By server header
app.disable("x-powered-by")

app.get('/get_post', readPostFromDisk);

app.get('/get_all', async (req, res) => {
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
});

app.get('/get_recent', async (req, res) => {
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
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
