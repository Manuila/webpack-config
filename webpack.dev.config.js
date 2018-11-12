const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const devConfig = {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    progress: true,
    port: 8000,
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader?sourceMap',
        {
          loader: 'postcss-loader?sourceMap',
          options: {
            plugins: [
              autoprefixer({
                browsers: ['ie >= 8', 'last 4 version'],
              }),
            ],
          },
        },
        'sass-loader?sourceMap',
      ],
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader?name=images/[name].[ext]',
      }],
    },
    {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      use: [{
        loader: 'file-loader?name=fonts/[name].[ext]',
      }],
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
