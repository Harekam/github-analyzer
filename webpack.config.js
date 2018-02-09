const path = require('path');
const webpack = require('webpack'),
  glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let htmlOptions = {
  template: './index.html',
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    removeAttributeQuotes: true
  }
};
module.exports = {
  entry: {
    'vendor': ['materialize-css'],
    'main': './src/index.js'

  },
  output: {
    path: __dirname,
    filename: 'bundle-[name].js'
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    hot: true,
    inline: true,
    publicPath: '/'
  },
  stats: {
    colors: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }, {
      test: /\.json$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].json'
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf)$/,
      loader: 'url-loader?limit=100000'
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    //new UglifyJSPlugin(),
    new ExtractTextPlugin('bundle-[name].css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /bundle-[name].css/,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin(htmlOptions),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};