const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");


module.exports = {
  entry: {
    app: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000",
      "./index.js"
    ]
  },

  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      include: __dirname,
      query: {
        presets: ["es2015", "react"]
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo PWA",
      template: "src/index.ejs"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
