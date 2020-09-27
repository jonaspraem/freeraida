const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/app/main.ts',
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.css$/, // for legacy purposes
        use: [{ loader: 'raw-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|tff|eot|ico)$/,
        use: [{ loader: 'file-loader?name=assets/[name].[hash].[ext]' }],
      },
    ],
    exprContextCritical: false,
  },
};
