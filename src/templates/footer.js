/*
  Public component footer
*/

module.exports = function(data, name, langs, config) {
  var langText = config.languageText;
  var selectLangs = '';
  for(var lang in langs) {
    selectLangs += '<li><a class="footer-lang" href="/'+ lang +'/'+ name + '/">'+ langText[lang] +'</a></li>'
  };
  var footer = [
    '<div class="global-footer" id="Footer">',
      '<p class="copyright">' + data.copyright + '</p>',
      '<ul class="lang-list" id="LangsList">' + selectLangs + '</ul>',
    '</div><!-- #Footer -->',
    '</div><!-- #Wrapper -->',
    '</body>',
    '</html>'
  ].join('\n');
  return footer;
};
  
