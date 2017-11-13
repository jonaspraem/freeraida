var webpack = require('webpack');

module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader' }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'raw-loader' }]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|tff|eot|ico)$/,
                use: [{ loader: 'file-loader?name=assets/[name].[hash].[ext]' }]
            }
        ],
    exprContextCritical: false
    }
};