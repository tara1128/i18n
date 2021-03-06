/*
  Webpack configuration file for CMS
  Latest modified: 2016-11-07 15:14
*/

var path = require('path');
var findRoot = require('find-root');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
var imageWebpackLoader = require('image-webpack-loader');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var RequireDir = require('require-dir');

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

/* The array for plugins of webpack */
var pluginsArray = [];

/* Default properties in the final index page, for html plugin */
var htmlDefaultOptions = {
  template: 'index.html',
  pagename: projectRootName,
  inject: 'body'
};

/* Public partials like header & footer */
var templatePath = path.join(devRoot, 'templates');
var pubHeader = require(templatePath + '/header');
var pubFooter = require(templatePath + '/footer');

/* Global i18n json datas, for public modules */
var globalI18nPath = path.join(devRoot, 'global-i18n');
var globalI18nData = RequireDir(globalI18nPath, {recurse:true}); 

/* Path of data json files, with different languages */
var jsonPath = path.join(__dirname, 'i18n'); /* Datas in the project */

/* Traversal i18n dir to get all languages this page supported: */
var langs = RequireDir(jsonPath, {recurse:true});

/* Extend properties for html plugin, for each lang */
for(var lang in langs){
  var _mergedOptions = {};
  var _htmlOptions = langs[lang];
  var _headerObject = {headerHtml: pubHeader(_htmlOptions, globalI18nData[lang])};
  var _footerObject = {footerHtml: pubFooter(_htmlOptions, globalI18nData[lang], projectRootName, langs, Config)};
  var _fileNameObj = {filename: path.join(distPath, lang, projectRootName, 'index.html')};
  var _langObj = {language: lang};
  Object.assign( _mergedOptions,
      htmlDefaultOptions,
      _htmlOptions,
      _headerObject,
      _footerObject,
      _fileNameObj,
      _langObj
  );
  var _htmlWebpackPlugin = new HtmlWebpackPlugin(_mergedOptions);
  pluginsArray.push( _htmlWebpackPlugin );
};

/* After traversal, add CSS */
pluginsArray.push(new ExtractTextPlugin( 'css/' + projectRootName + '.min.css'));

/* Uglify JS also using plugin */
pluginsArray.push(new WebpackUglifyJsPlugin({
  cacheFolder: path.join(distPath, 'assets', projectRootName),
  minimize: true,
  sourceMap: false,
  output: {comments:false},
  compressor: {warnings:false}
}));

/* Deal with images in html, copy to the distribution dir. */
pluginsArray.push(new CopyWebpackPlugin([
  { from: './images', to: path.join( distPath, '/assets', projectRootName, 'images') }
]));

/* Here comes the module to export! */
module.exports = {
  entry: './entry.js',
  output: {
    path: path.join(distPath, 'assets', projectRootName),
    publicPath: path.join('/assets', projectRootName, '/'),
    filename: 'js/' + projectRootName + '.min.js'
  },
  module: {
    loaders: [
      {test:/\.css$/, loader:ExtractTextPlugin.extract('style-loader', 'css-loader') },
      {test:/\.json$/, loader:'json'},
      // {test:/\.handlebars$/, loader:'handlebars'},/* Pattern must be handlebars, not hbs */
      {test:/\.(woff2?|ttf|eot|svg)$/, loader:'file?name=[path][name].[ext]'},
      {test:/\.(png|gif|jpe?g|svg)$/i, loaders:['file?name=[path][name].[ext]', 'image-webpack']},
      // {test:/\.html$/, loader:'html' } //cause html minification and disable the ejs fallback loader.
    ]
  },
  imageWebpackLoader: {
    mozjpeg: {quality: 65}, /* Compress jpg to 65% of the origin quanlity */
    pngquant: {quality: 70} /* Compress png */
  },
  plugins: pluginsArray
};

