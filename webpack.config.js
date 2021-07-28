const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";

const outputPath = path.join(__dirname, "dist");

module.exports =  {
  mode: isDev ? "development" : "production",
  target: "web",
  devtool: isDev ? "source-map" : false,
  entry: path.join(__dirname, "src", "index"),
  output: {
    filename: "index.js",
    path: outputPath,
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", "index.html"),
          to: outputPath,
        },
        {
          from: path.join(__dirname, "public", "*.mp3"),
          to: path.join(outputPath)
        }
      ],
    }),
  ],
  devServer: {
    contentBase: [outputPath, path.join("public")],
    port: 8080,
    open: true,
  },
};