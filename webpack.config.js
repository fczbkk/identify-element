module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: './lib/',
    library: 'IdentifyElement',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader']
      }
    ]
  }
};