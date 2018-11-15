const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');


const commonConfig = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash].[ext]',
          publicPath: path.join('..'),
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'media/[name].[hash].[ext]',
          publicPath: path.join('..'),
          limit: 10000,
        },
      },
      {
        test: /\.(png|jpeg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[hash].[ext]',
          publicPath: path.join('..'),
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new SpriteLoaderPlugin(),
  ],
};

module.exports = commonConfig;
