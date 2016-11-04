/*
  Script for the current page
  Deal with the business, specifically.
*/

console.log('Business script runs..' );

var h2 = document.getElementById('dynamic');
h2.innerHTML = 'Dynamic title was written by JS!';

var people = ['Geddy', 'Neil', 'Alex'];
var html = ejs.render('<a><%= people.join(", "); %></a>', {people: people});

h2.innerHTML += html;

var langs = require('../langs.json').langs;
langs.map(function(lang){
  var langData = require('../i18n/' + lang);
  console.log( lang, langData );
});

