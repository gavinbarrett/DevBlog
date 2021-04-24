// import env variables
require('dotenv').config();
module.exports = {
	entry: './src/App.tsx',
	mode: process.env.MODE,
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: ['ts-loader'],
			},
			{
				test: /\.(css|scss)$/,
				exclude: /node_modules/,
				use: [
					{ 
						loader: 'style-loader'
					},
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader',
			},
		]
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	output: {
		filename: 'App.js',
		path: __dirname + '/dist',
	},
};
