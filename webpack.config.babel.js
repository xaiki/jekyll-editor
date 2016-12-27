import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import  webpackTargetElectronRenderer from 'webpack-target-electron-renderer'

let options = {
    context: __dirname,
    entry: './entry.js',
    output: {
      path: path.resolve(__dirname, 'app/dist'),
      filename: 'app.js'
    },
  plugins: [
    new webpack.IgnorePlugin(/vertx/)
  ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: { presets: ['es2015', 'react'] }
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style", "css!less"),
          include: [
            path.resolve(__dirname, 'app/css'),
          ]
        },
        {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract("style", "css!less"),
          include: [
            path.resolve(__dirname, 'app/css'),
          ]
        }
      ]
    },
    plugins: [
       new ExtractTextPlugin("app.css")
    ]
}

options.target = webpackTargetElectronRenderer(options)

export default options
