const path = require('path');

module.exports = {
  entry: '/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080, // The port number you want to use for the Dev Server
    open: true, // Automatically open the browser when the Dev Server starts
  },
};
