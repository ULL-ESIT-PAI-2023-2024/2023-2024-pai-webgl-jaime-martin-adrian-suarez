// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development", // Add the development mode
  entry: "./app/main.ts",
  output: {
    filename: "main.js",  
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
