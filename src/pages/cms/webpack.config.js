/*
  Webpack configuration file for CMS
  Latest modified: 2016-11-04 20:21
*/

var path = require('path');
var findRoot = require('find-root');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var requireDir = require('require-dir');

/* The root path of this tool 'i18n' */
var Root = findRoot();

/* Fetch the global configuration object that you customized for the whole website */
var Config = require(path.join(Root, 'config.json'));

/* The path of development directory */
var devRoot = path.join(Root, Config.sourceRoot);

/* Since '__dirname' is the directory that the currently executing script resides in, */
/* that this directory name also is the name of the current project, */
/* assuming the current webpage is an isolate project. */
var projectRootName = path.basename(__dirname);

/* Set paths for the distribution */
/* Make sure the distribution directory can be transplanted */
var distPath = path.join(Root, Config.websiteRoot); 

/* Path of directory in where global templates are, like header&footer */
var templatePath = path.join(devRoot, 'templates');

/* Public templates, header & footer ... */

/* Path of i18n json files for this project: */
// var jsonPath = path.join(devRoot, 'i18n', projectRootName); /* Datas out of the project */
var jsonPath = path.join(__dirname, 'i18n'); /* Datas in the project */

/* All languages that this project supported: */
// var langs = require( jsonPath + '/langs.json').langs;
var langs = requireDir(jsonPath, {recurse:true});

/* Default properties for the final index page of this project */
var htmlDefaultOptions = {
  template: 'index.html',
  pagename: projectRootName,
  inject: 'body'
};

/* Traversal of langs, creating plugins array */
var pluginsArray = [];
for(var lang in langs){
  var _mergedOptions = {};
  // var _langJsonFile = lang + '.json';
  // var _htmlOptions = require( path.join(jsonPath, _langJsonFile) );
  var _htmlOptions = langs[lang];
  var _fileNameObj = {filename: path.join(distPath, lang, projectRootName, 'index.html')};
  var _langObj = {language: lang};
  Object.assign(_mergedOptions, htmlDefaultOptions, _fileNameObj, _langObj, _htmlOptions);
  var _htmlWebpackPlugin = new HtmlWebpackPlugin(_mergedOptions);
  pluginsArray.push( _htmlWebpackPlugin );
};

/* After traversal, add CSS */
pluginsArray.push(new ExtractTextPlugin( projectRootName + '.css'));

/* Here comes the module to export! */
module.exports = {
  entry: './entry.js',
  output: {
    path: path.join(distPath, 'assets', projectRootName),
    publicPath: path.join('/assets', projectRootName, '/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test:/\.css$/, loader:ExtractTextPlugin.extract('style-loader', 'css-loader') },
      {test:/\.json$/, loader:'json'},
      {test:/\.(png|gif|jpe?g|svg)$/i, loader:'file?name=[path][name].[ext]'},
      {test:/\.(woff2?|ttf|eot|svg)$/, loader:'file?name=[path][name].[ext]'}
      // {test:/\.html$/, exclude:/index.html$/, loader:'html' } //cause html minification and disable the ejs fallback loader.
      // {test:/\.html$/, exclude:/index.html$/, loader:'underscore-template-loader', query:{engine:'lodash'}}
    ]
  },
  plugins: pluginsArray
};

