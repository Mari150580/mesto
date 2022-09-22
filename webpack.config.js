const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключите плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  mode: 'development',
  devtool: "inline-source-map",
  
  
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),

  ]
} 