import webpack from 'webpack'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'

export default {
  entry: './index.js',
  watch: false,
  cache: false,
  target: 'web',
  output: {
    publicPath: './',
    filename: 'dist/bundle.[chunkhash].js',
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
    new CleanWebpackPlugin([
      'dist',
      'favicon.png',
      'index.html'
    ]),
    new FaviconsWebpackPlugin({
      logo: './statics/favicon.png',
      prefix: 'dist/icons-[hash]/',
      inject: true,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
    new ExtractTextPlugin('dist/bundle.[chunkhash].css'),
    new HtmlWebpackPlugin({
      template: 'statics/template.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ]
}
