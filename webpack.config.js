const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VirtualModulePlugin = require("virtual-module-webpack-plugin")

const process = require("process")

module.exports = {
  entry: "./app/index.jsx",
  resolve: {
    extensions: [".js",".jsx",".json", ".scss"],
    modules: [path.resolve(__dirname, "app"), "node_modules"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: {
      disableDotRule: true,
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.jsx?$/, use: "eslint-loader", exclude: /node_modules/, enforce: "pre" },
      { test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"], exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.yml$/, use: ["json-loader", "yaml-loader"], exclude: /node_modules/ },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      filename: "index.html",
      inject: "body",
      title: "AlumniEI Mentorship Program",
    }),
    new VirtualModulePlugin({
      moduleName: "app/config.json",
      contents: {
        apiBaseURL: process.env.API_BASE_URL
      }
    }),
  ],
};
