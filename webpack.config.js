const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './public/index.html', to: 'index.html' },
      { from: './public/favicon.ico', to: 'favicon.ico' },
      { from: './public/social_logo.jpg', to: 'social_logo.jpg' },
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  devtool: isProduction ? '(none)' : 'inline-source-map',
  node: {
    __filename: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { minimize: isProduction } },
          { loader: 'sass-loader' },
        ],
      },
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: {
          test: path.resolve(__dirname, 'node_modules'),
          exclude: path.resolve(__dirname, 'node_modules/web3-provider-engine'), // allow some untranspiled modules
        },
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
      {
        test: /\.(ttf|svg|eot|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]',
        },
      },
    ],
  },
};


if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
