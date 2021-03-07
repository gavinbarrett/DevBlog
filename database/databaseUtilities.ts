const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.USER,
	host: process.env.HOST,
	database: process.env.DB,
	password: process.env.PASS,
	port: 5432
});

module.exports = {
	// query the posts database
	query: (text, values) => pool.query(text, values),
}
