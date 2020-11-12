const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, '../example/src/app.js'),
    output: {
        path: path.join(__dirname, '../example/src/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8129,
                        fallback: 'file-loader'
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 100,
                            remPrecision: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '测试页面',
            template: path.join(__dirname, '../example/src/index.html'),
            filename: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin()
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '../example/src/'),
        compress: true,
        port: 3003,
        open: true
    }
}