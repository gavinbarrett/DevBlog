const express = require("express");
const app = express();
const port = 5000;

// server content from the /dist subdirectory
app.use(express.static("./dist"));
// disable X-Powered-By server header
app.disable("x-powered-by")

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
