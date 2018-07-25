const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const OUTPUT_FOLDER = 'prod';

module.exports = dirName => ({
    devtool: false,

    mode: 'production',

    output: {
        filename: 'app.[hash].js',
        path: path.join(dirName, OUTPUT_FOLDER),
        publicPath: '/',
    },

    devServer: {
        historyApiFallback: true,
        contentBase: `/${OUTPUT_FOLDER}/`,
        port: 3000,
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                    },
                    output: {
                        beautify: false,
                        comments: false,
                    },
                    mangle: {
                        keep_fnames: false,
                    },
                    sourceMap: true,
                    ie8: false,
                },
            }),
        ],
    },

    plugins: [
        new CleanWebpackPlugin([ OUTPUT_FOLDER ], { root: dirName }),
        new webpack.DefinePlugin({
            NODE_ENV: 'prod',
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