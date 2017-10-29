const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

const babelSettings = JSON.parse(fs.readFileSync('.babelrc')).presets;

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: [__dirname + '/src/main.js'],
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: babelSettings,
        },
      },
    ],
  },
  devtool: "source-map",
  context: __dirname,
  plugins: [
    HTMLWebpackPluginConfig,
  ],
};
