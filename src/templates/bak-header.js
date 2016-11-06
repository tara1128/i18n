/*
  Public component header
*/

module.exports = function(data) {
  var header = [
    '<div class="pub-header" id="Header">',
      '<ul class="nav">',
        '<li><a class="nav-item">' + data.menu.home + '</a></li>',
        '<li><a class="nav-item">' + data.menu.products + '</a></li>',
        '<li><a class="nav-item">' + data.menu.services + '</a></li>',
        '<li><a class="nav-item">' + data.menu.contact + '</a></li>',
      '</ul>',
    '</div>'
  ].join('');
  return header;
};
