module.exports = {
  mode: 'development', // Or 'production'
  entry: './js/script.js',
  output: {
    filename: 'bundle.js', // Name of the bundled file
    path: path.resolve(__dirname, 'dist'), // Output directory path
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