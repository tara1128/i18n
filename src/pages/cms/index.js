require('./cms.css');
console.log('CMS index.js runs');

/* Get json files with multiple languages: */
var jsonFiles = require.context('../../i18n/cms/', false, /\.json$/);
jsonFiles.keys().map(function(item, index){
  console.log(item, index);
});


var h1 = document.createElement('h1');
h1.innerHTML = 'Hello CMS!';
document.body.appendChild(h1);

