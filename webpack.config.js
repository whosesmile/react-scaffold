var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var port = 3302;

var plugins = [];

// 生产模式
if (process.argv.indexOf('--compress') > -1) {
  plugins = [
    new webpack.ProvidePlugin({ $: 'zepto-on-demand' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: 'production' } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ];
}
// 开发模式
else {
  plugins = [
    new webpack.ProvidePlugin({ $: 'zepto-on-demand' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ title: '千丁前端', template: './template.html', chunks: [] }),
    new OpenBrowserPlugin({ url: 'http://localhost:' + port }),
  ];
}

module.exports = {
  entry: Object.assign(entries(), {
    vendor: ['react', 'react-dom', 'react-router', 'react-addons-css-transition-group', 'classnames', 'zepto-on-demand', 'fastclick'],
  }),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: require.resolve('zepto-on-demand'),
      loader: 'exports-loader?window.Zepto!script-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
      }
    }, {
      test: /\.less$/,
      loader: 'style!css!postcss!less'
    }]
  },
  postcss: [autoprefixer(['iOS >= 7', 'Android >= 4.1'])],
  devServer: {
    host: '0.0.0.0',
    port: port,
    hot: true,
    inline: true,
    compress: true,
    contentBase: 'dist',
    historyApiFallback: true,
    setup: function(app) {
      app.all('/*/ajax/**', function(req, res) {
        // req.query
        var path = './mock' + req.path.replace(/\/ajax/, '');
        delete require.cache[require.resolve(path)];
        // res.json(require(path)());
        setTimeout(function() { res.json(require(path)()); }, 500);
      });
    }
  },
  resolve: {
    extensions: ['', '.js', 'json', '.jsx'],
  },
};


// 递归目录查找模块
function entries() {
  var result = {};
  var base = path.join(__dirname, './src/modules');
  fs.readdirSync(base).forEach(function(file) {
    file = path.resolve(base, file);
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory() && fs.existsSync(path.join(file, 'index.jsx'))) {
      var name = path.join('modules', path.basename(file));
      result[name] = ['./src', name, 'index.jsx'].join(path.sep);
    }
  });
  return result;
}
