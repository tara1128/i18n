/*
  Webpack configuration file for CMS
  Latest modified: 2016-11-03 10:31
*/

var path = require('path');
var findRoot = require('find-root');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/* The root path of this tool */
var Root = findRoot();

/* The path of development directory */
var srcRoot = path.join( Root, 'src' );

/* Since '__dirname' is the directory that the currently executing script resides in
/* that this directory name also is the name of the current project,

*/
var projectRootName = path.basename(__dirname);

/* Fetch the global configuration object that you customized */
var config = require( path.join(Root, 'config.json') );

/* Set paths for the distribution */
var distPath = path.join(Root, config.websiteRoot); 
var cssPath = path.join(Root, config.styleRoot);
var jsPath = path.join(Root, config.scriptRoot);
var imgPath = path.join(Root, config.imagesRoot);

/* Path of i18n json files for this project: */
var jsonPath = srcRoot + '/i18n/' + projectRootName + '/';

/* All languages this project supported: */
var langs = require( jsonPath + 'langs.json').langs;

/* Properties for the final index page: */
var htmlDefaultOptions = {
  template: projectRootName + '.hbs', // Need header&footer
  inject: 'body'
};

/* Traversal of langs, creating plugins array */
var pluginsArray = [];
langs.map(function( lang, index ){
  var _mergedOptions = {};
  var _htmlOptions = require( jsonPath + lang + '.json' );
  var _fileNameObj = {filename: distPath + '/' + lang + '/' + projectRootName + '/index.html'};
  Object.assign(_mergedOptions, htmlDefaultOptions, _fileNameObj, _htmlOptions);
  var _htmlWebpackPlugin = new HtmlWebpackPlugin(_mergedOptions);
  pluginsArray.push( _htmlWebpackPlugin );
});

/* After traversal, add CSS */
pluginsArray.push(new ExtractTextPlugin( cssPath + '/' + projectRootName + '.min.css'));

/* Here comes the module to export! */
module.exports = {
  entry: './index.js',
  output: {
    path: jsPath,
    publicPath: '',
    filename: projectRootName + '.min.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.handlebars$/, loader: 'handlebars-loader' },
      { test: /\.png$/, loader: 'file-loader' }
    ]
  },
  plugins: pluginsArray
};

