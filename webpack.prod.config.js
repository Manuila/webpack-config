const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

const prodConfig = {
  mode: 'production',
  devtool: 'none',
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer({
                browsers: ['ie >= 8', 'last 4 version'],
              }),
            ],
          },
        },
        'sass-loader',
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
      hash: true,
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
