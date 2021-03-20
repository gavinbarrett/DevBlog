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
	const query = `select * from blogposts order by post_time desc`;
	// query database
	const rows = await database.query(query);
	res.send(JSON.stringify({"rows": rows.rows}));
});
app.get('/get_recent', async (req, res) => {
	const query = `select * from blogposts order by post_time desc`;
	// query database
	const resp = await database.query(query);
	// extract three most recent posts
	const rows = resp.rows.slice(0, 3);
	res.send(JSON.stringify({"rows": rows}));
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
