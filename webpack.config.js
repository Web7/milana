const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PAGES = fs.readdirSync('./src/components/pages/').filter(fileName => fileName.endsWith('.pug'));

const configureCopy = () => {
	return [
		// {from: "src/video/", to: "video/"},
		{from: "src/images/", to: "images/"},
		{from: 'src/fonts/', to: 'fonts/'},
		{from: 'src/js/', to: 'js/'}
	]
};

module.exports = {
	mode: 'development',

	entry: {
		index: './src/index.js'
	},

	output: {
		filename: 'js/temp-index.min.js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(svg|png|jpg|gif|jpeg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name].[ext]',
						outputPath: 'images/',
						publicPath: '../'
					}
				}
			},
			{
				test: /\.(mp4)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'video/[name].[ext]',
						outputPath: 'video/',
						publicPath: '../'
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'fonts/[name].[ext]',
							outputPath: 'fonts/',
							publicPath: '../'
						}
					}
				]
			},
			{
				test: /\.pug$/,
				use: {
					loader: 'pug-loader',
					options: {
						pretty: true,
						self: true
					}
				}
			},
			{
				test: /\.sass$/,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader', // style nodes from js strings
					'css-loader',
					'sass-loader'
				]
			}
		]
	},

	plugins: [
		new CopyWebpackPlugin({
			patterns: configureCopy()
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css',
			chunkFilename: '[id].css'
		}),
		...PAGES.map(page => new HtmlWebPackPlugin({
				template: `./src/components/pages/${page}`,
				filename: `${page.replace(/\.pug/, '.html')}`,
				file: require('./src/data/index.json'),
				cache: false
			})
		)
	],

	optimization: {
		minimizer: [new TerserPlugin()],

		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: false
		}
	}
};
