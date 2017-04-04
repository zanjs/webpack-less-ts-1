var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

const ExtractTextPlugin = require("extract-text-webpack-plugin")


module.exports = {
  entry: {
    app:'./src/app.js',
    contact:'./src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('css/[name].[chunkhash].css').replace('css/js', 'css');
      },
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'myApp',
      minify: {
        collapseWhitespace: true //生成被压缩的html文件
      },
      hash: true,
      template: './index.html', // Load a custom template (ejs by default see the FAQ for details)
    })

  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9090,
    stats: 'errors-only',
    open: true // 启动后自动打开浏览器窗口
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ],
    // rules: [
    //   {test: /\.css$/, use: ['style-loader', 'css-loader']},
    //   {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
    // ],
  }
}