import webpack from 'webpack'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  entry: './index.js',
  watch: true,
  cache: true,
  target: 'web',
  output: {
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss')
    }]
  },
  postcss: function (webpack) {
    return [
      postcssImport({addDependencyTo: webpack}),
      autoprefixer({browsers: [
        'ff >= 20',
        'ie >= 11',
        'safari >= 7',
        'opera >= 12',
        'chrome >=20'
      ]})
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      template: 'statics/template.html',
      inject: true
    })
  ],
  devServer: {
    hot: false,
    host: 'localhost',
    port: 3000,
  }
}
