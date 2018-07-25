const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = dirName => ({
	entry: {
		app: ['babel-polyfill', './src/app.js'],
		vendor: Object.keys(require(`${dirName}/package`).dependencies),
	},

	output: {
		filename: 'app.[hash].js',
		publicPath: '/',
	},

	devServer: {
		historyApiFallback: true,
		port: 3000,
	},

	node: {
		fs: 'empty',
		net: 'empty',
	},

	module: {
		noParse: content => /express/.test(content),
		rules: [
			{
				test: /\.jsx?$/,
				use: ['babel-loader', 'eslint-loader'],
				include: [
					path.join(dirName, 'src'),
				],
				exclude: [
					path.join(dirName, 'node_modules'),
				],
			},
			{
				test: /\.scss$/,
				exclude: [
					path.join(dirName, 'node_modules'),
				],
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
			{
				test: /\.jp(e)?g|\.png/,
				loader: 'file-loader',
				options: {
					name: '[name]-[hash].[ext]',
				},
			},
			{
				test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
				loader: 'url-loader',
				options: {
					name: '[name]-[hash].[ext]',
					limit: 100000,
				},
			},
		],
	},

	optimization: {
		runtimeChunk: false,
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'all',
					name: 'vendor',
					test: /node_modules\/(.*)\.js/,
				},
			},
		},
	},
});