'use strict';

const 	path				= require('path'),
		HtmlWebpackPlugin	= require('html-webpack-plugin'),
		CleanWebpackPlugin	= require('clean-webpack-plugin'),
		CopyWebpackPlugin	= require('copy-webpack-plugin'),
		TsconfigPathsPlugin	= require('tsconfig-paths-webpack-plugin')

module.exports = {
	context	: path.resolve(__dirname, 'src'),

	// Entry point : first executed file
	entry	: './code/main.ts',

	// What files webpack will manage
	resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },

	// Make errors mor clear
	devtool: 'inline-source-map',

	// Configure output folder and file
	output	: {
		path		: path.resolve(__dirname, 'dist'),
		filename	: 'bundle.js'
	},

	// typescript loader
	module	: {
		rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
	},

	resolve	: {
		plugins	: [
			new TsconfigPathsPlugin({})
		],
		extensions: ['.tsx', '.ts', '.js']
	},

	// dev server configuration
	devServer	: {
        contentBase	: path.join(__dirname, 'dist'),
		port		: 9000
    },

	plugins		: [
	   new CleanWebpackPlugin(),
	   new HtmlWebpackPlugin({
		   template: 'index.html'
	   }),
	   new CopyWebpackPlugin([{
		   from	: path.join(__dirname, 'src/assets'),
		   to	: path.join(__dirname, 'dist')
	   }])

   ],

	mode	: 'development'
};
