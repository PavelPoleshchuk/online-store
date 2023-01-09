const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'assets/images/[name][ext]'
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      favicon: './src/assets/favicon.ico',
    }),
    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimize: false
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
