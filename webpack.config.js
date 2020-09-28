const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
console.log('IS PROD:', isProd)

const PATHS = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist'),
    views: path.resolve(__dirname, 'src/assets'),
    assets: 'assets',
}

console.log(PATHS.src, path.resolve(__dirname, 'src'))

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
    ]

    if (isDev) loaders.push('eslint-loader')

    return loaders
}

module.exports = {
    context: PATHS.src,
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: filename('js'),
        path: PATHS.dist
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': PATHS.src,
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 9000,
        hot: isDev
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            }
        }),
        new HTMLWebpackPlugin({
            filename: `${PATHS.assets}/dashboard.html`,
            template: `${PATHS.views}/dashboard.html`,
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            }
        }),
        new HTMLWebpackPlugin({
            filename: `${PATHS.assets}/excel.html`,
            template: `${PATHS.views}/excel.html`,
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/favicon.ico`,
                    to: PATHS.dist
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            }
        ],
    },
}
