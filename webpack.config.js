const path = require('path');

module.exports = {
  mode: 'production', // Or 'production'
  entry: './js/script.js',
  output: {
    filename: 'bundle.js', // Name of the bundled file
    path: path.resolve(__dirname, 'dist'), // Output directory path
  },  
  resolve: {
    extensions: ['.js'], // Explicitly add .js to resolve extensions
  },
  module: {
    rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         use: ['file-loader'],
       },
    ],
  },
};