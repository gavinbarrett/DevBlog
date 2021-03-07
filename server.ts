require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
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
app.get('/get_recent', async (req, res) => {
	const query = `select * from blogposts order by post_time`;
	const resp = await database.query(query);
	const r = resp.rows.slice(0, 3);
	console.log(r);
	res.send(JSON.stringify({"status": "success"}));
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
