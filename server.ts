require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const { getQueriedPosts, getRecentPosts, readPostFromDisk, readAllPostsFromDisk } = require("./database/diskUtilities.ts");
const database = require("./database/databaseUtilities.ts");

// allow json parsing
app.use(express.json());
// server content from the /dist subdirectory
app.use(express.static("./dist"));
// disable X-Powered-By server header
app.disable("x-powered-by")

app.get('/get_post', readPostFromDisk);
app.get('/get_all', readAllPostsFromDisk);
app.get('/get_recent', getRecentPosts);
app.get('/get_posts/:query_regex', getQueriedPosts);

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
});
