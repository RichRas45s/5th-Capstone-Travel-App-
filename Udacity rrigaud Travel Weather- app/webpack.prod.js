/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const StylesLoader = require('styles-loader')
// const stylesLoader = new StylesLoader()
const TerserPlugin = require('terser-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
     output: {
         libraryTarget: 'var',
         library: 'Client'
     },
     optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerWebpackPlugin({})],
        },
    module: {
        rules: [
            {
                test:  /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW(),
        new EnvironmentPlugin({
            NODE_ENV: 'production'
          })
    ]
}