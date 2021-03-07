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
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
