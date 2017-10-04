var path = require('path');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge.smart(commonConfig, {
    entry: {
        'app': './assets/app/main.aot.ts'
    },

    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        filename: 'bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {loader: 'awesome-typescript-loader', options: {
                        transpileOnly: true
                    }},
                    {loader: 'angular2-template-loader'},
                    {loader: 'angular-router-loader?aot=true&genDir=public/js/app'}
                ]
            }
        ]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        })
    ]
});