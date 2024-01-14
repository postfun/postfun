module.exports = {
  mode: 'development', // Or 'production'
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
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