var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var HtmlPlugin = require('./lib/html-plugin')
var htmlObj = require('./html.js')
var node_modules_dir = path.resolve(__dirname, 'node_modules')

var isProd = process.env.NODE_ENV === 'production' ? true : false

// SETUP HTML AND PLUGINS
var plugins = []
var html

if (isProd) {
  html = htmlObj.prod
  // Pulls CSS out of bundle into it's own file
  plugins.push(new ExtractTextPlugin('style.css', {allChunks: true}))
  // Searches for equal or similar files and deduplicates them in the output
  plugins.push(new webpack.optimize.DedupePlugin())
  // Reduces total file size
  plugins.push(new webpack.optimize.OccurenceOrderPlugin(true))
  plugins.push(new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'))
  // Reduce React lib size
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  // Minifies the bundle
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true, compress: { warnings: false }}))
  // Gzip action: enable when you need it
  // plugins.push(new CompressionPlugin({
  //     asset: '{file}.gz',
  //     algorithm: 'gzip',
  //     regExp: /\.js$|\.css$/,
  //     threshold: 10240,
  //     minRatio: 0.8
  //   }));
} else {
  html = htmlObj.dev
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

plugins.push(new HtmlPlugin({html: html}))

// SETUP ENTRY
var entry = []
if (isProd) {
  entry = {}
  entry.app = './app/index.prod'
  entry.vendors = ['react', 'react-router']
} else {
  entry.push('./app/index.dev', 'webpack-dev-server/client?http://localhost:3000','webpack/hot/only-dev-server')
}

// SETUP LOADERS

var loaders = [
  {
    test: /\.js$/,
    loaders: ['babel'],
    exclude: /node_modules/,
    include: path.join(__dirname, 'app')
  },
  {
    test: /\.css$/,
    loader: isProd ? ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]') : 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
  },
  {
    test: /\.scss$/,
    loader: isProd ? ExtractTextPlugin.extract('style', '!css!sass') : 'style!css!sass'
  },
  {
    test: /\.(png|ico)$/,
    exclude: /node_modules/,
    loader: 'file-loader?name=img/[path][name].[ext]&context=./app/images'
  },
  {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
  {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
  {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
  {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
]

if (!isProd) {
  loaders[0].loaders.unshift('react-hot')
}

// SETUP DEVTOOL
var devtool
if (isProd) {
  devtool = 'source-map'
} else {
  devtool = 'eval'
}

module.exports = {
  devtool: devtool,
  entry: entry,
  stylePath: path.resolve(__dirname, 'app', 'style'),
  output: {
    path: path.join(__dirname, '/__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    cssFilename: 'style.css',
    publicPath: '/'
  },
  plugins: plugins,
  module: {
    loaders: loaders
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './app/style'), path.resolve(__dirname, './node_modules')]
  },
  resolve: {
    root: path.resolve(__dirname),
    extensions: [
      '',
      '.js',
      '.css',
      '.scss'
    ],
    modulesDirectories: [
      'app',
      'node_modules'
    ]
  }
}
