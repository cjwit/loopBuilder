const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(mp3)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'samples',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  mode: 'development',
  entry: './scripts/script.js',
  output: {
    filename: './main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
};