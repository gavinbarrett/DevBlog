const express = require("express");
const app = express();
const port = 5000;

// FIXME: add disk utilities
// FIXME: add database utilities

// allow json parsing
app.use(express.json());
// server content from the /dist subdirectory
app.use(express.static("./dist"));
// disable X-Powered-By server header
app.disable("x-powered-by")

app.post('/get_post', (req, res) => {
	console.log(req.body);
	const { digest } = req.body;
	console.log(`Digest: ${digest}`);
	res.send(JSON.stringify({"status":"success"}));
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
