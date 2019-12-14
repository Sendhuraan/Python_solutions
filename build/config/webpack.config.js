'use strict';

(function() {

	var MiniCssExtractPlugin = require('mini-css-extract-plugin');
	var nodeExternals = require('webpack-node-externals');

	var transpileConfig = require('./babel.config.js');

	var node = {
		entry: '',
		mode: 'development',
		target: 'node',
		node: {
			__dirname: false
		},
		output: {
			path: '',
			filename: 'index.js'
		},
		externals: [nodeExternals()],
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				{
					test: /\.(js|jsx)$/,
					use: {
						loader: 'babel-loader',
						options: transpileConfig.node
					}
				}
			]
		},
		plugins: [],
		resolve: {
			extensions: [
				'.js',
				'.jsx'
			]
		}
	};

	var browser = {
		entry: '',
		mode: 'development',
		target: 'web',
		output: {
			path: '',
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						// {
						// 	loader: MiniCssExtractPlugin.loader
						// },
						'style-loader',
						'css-loader'
					]
				},
				{
					test: /\.scss$/,
					use: [
						// {
						// 	loader: MiniCssExtractPlugin.loader
						// },
						'style-loader',
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.less$/,
					use: [
						// {
						// 	loader: MiniCssExtractPlugin.loader
						// },
						'style-loader',
						'css-loader',
						'less-loader'
					]
				},
				{
					test: /\.pcss$/,
					use: [
						// {
						// 	loader: MiniCssExtractPlugin.loader
						// },
						'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: (loader) => [
									require('postcss-import')({ root: loader.resourcePath }),
									require('postcss-css-variables')()
								]
							}
						}
					]
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: 'images/[hash].[ext]'
							}
						}
					]
				},
				{
					test: /\.(js|jsx)$/,
					use: {
						loader: 'babel-loader',
						options: transpileConfig.browser
					},
					exclude: /node_modules/
				},
				{
					test: /\.(html)$/,
					use: {
						loader: 'html-loader'
					}
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
				chunkFilename: '[id].css'
			})
		],
		resolve: {
			extensions: [
				'.js',
				'.jsx',
				'.scss'
			]
		}
	};

	var publicAPI = {
		node,
		browser
	};

	module.exports = publicAPI;

}());
