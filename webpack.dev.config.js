const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/index.html' }, // all request to index.html
      ],
    },
  },
};
