const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const UglifyJsPlugin = require('uglifyjs-3-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge.smart(commonConfig, {
  entry: {
    app: './client/app/main.aot.ts',
  },

  output: {
    path: path.resolve(__dirname + '/../public/js/app'),
    filename: 'bundle.js',
    publicPath: '/js/app/',
    chunkFilename: '[id].[hash].chunk.js',
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack',
      },
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader?aot=true'],
        exclude: [/node_modules/, /server/],
      },
    ],
  },

  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        ie8: false,
        output: {
          comments: false,
        },
      },
    }),
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig.aot.json',
      entryModule: './client/app/app.module#AppModule',
      sourceMap: true,
    }),
  ],
});
