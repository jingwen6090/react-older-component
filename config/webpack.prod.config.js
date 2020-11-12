const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../lib/'),
        filename: 'index.js',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/El.css'
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                message: [path.resolve(__dirname, '..', 'lib')],
                notes: [`打包成功: ${path.resolve(__dirname, '..', 'lib')}`],
            },
        }),
    ],
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    }
}