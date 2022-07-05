const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require("lodash");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  module: {
    rules: [
      { test: /\.txt?/, use: "raw-loader" },

      {
        test: /\.s[ac]ss$/i,
        use: [{ loader: "style-loader" }, {loader: "css-loader" }, {loader: "sass-loader" }],
      },

      {
        test: /\.(woff|woff2)$/i,
        loader: "url-loader",
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "src/images",
            },
          },
        ],
      },

      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              url: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(                            
    {template: 'src/html/index.html'}                         
  )],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
