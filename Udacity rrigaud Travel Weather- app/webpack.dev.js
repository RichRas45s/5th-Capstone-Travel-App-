/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
const path = require('path');
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylesLoader = require('styles-loader')
const stylesLoader = new StylesLoader()
// const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin'); 

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  devtool: 'source-map',
  stats: 'verbose',
  output: {
    libraryTarget:'var',
    library: 'Client',
    // path: path.resolve(process.cwd(), 'dist'),
},
module: {
    rules: [
        {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
            test: /\.html/,
            loader: "html-loader",
          },
    ]
},
plugins: [
    new HtmlWebPackPlugin(({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    })),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new CleanWebpackPlugin({
          // Simulate the removal of files
          dry: true,
          // Write Logs to Console
          verbose: true,
          // Automatically remove all unused webpack assets on rebuild
          cleanStaleWebpackAssets: true,
          protectWebpackAssets: false
    })
]
}