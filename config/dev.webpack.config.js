const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const OUTPUT_FOLDER = 'dist';

module.exports = dirName => ({
    devtool: false,

    mode: 'development',

    output: {
        path: path.join(dirName, OUTPUT_FOLDER),
    },

    devServer: {
        contentBase: `/${OUTPUT_FOLDER}/`,
    },

    plugins: [
        new CleanWebpackPlugin([ OUTPUT_FOLDER ], { root: dirName }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
        new webpack.DefinePlugin({
            NODE_ENV: 'dev',
            OUTPUT_FOLDERS: JSON.stringify(OUTPUT_FOLDER),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${dirName}/src/index.html`,
        }),
    ],
});