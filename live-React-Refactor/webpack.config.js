const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/entrypoint.tsx",
	module: {
		rules: [
			{
				test: /.tsx?$/,
				exclude: /node_modules/,
				use: "ts-loader",
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js",
	},
};
