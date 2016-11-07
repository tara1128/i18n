/*
  Public component header
*/

module.exports = function(data) {
  var header = [
    '<!DOCTYPE html>',
    '<html>',
      '<head>',
        '<meta charset="UTF-8">',
        '<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">',
        '<title>' + data.title + '</title>',
        '<meta name="format-detection" content="telephone=no">',
        '<meta name="keywords" content="' + data.keywords + '">',
        '<meta name="description" content="' + data.description + '">',
        '<link rel="shortcut icon" href="/public/images/favicon.ico" type="image/x-icon" />',
        '<link rel="stylesheet" href="/public/styles/reset.css" type="text/css" />',
        '<link rel="stylesheet" href="/public/styles/global.css" type="text/css" />',
        '<script src="/public/lib/jquery-1.9.1.min.js"></script>',
      '</head>',
      '<body class="body-' + data.pagename + ' body-' + data.language + '">',
        '<div class="global-wrapper" id="Wrapper">',
          '<div class="global-header" id="Header">',
            '<ul class="nav">',
              '<li><a class="nav-item">' + data.menu.home + '</a></li>',
              '<li><a class="nav-item">' + data.menu.products + '</a></li>',
              '<li><a class="nav-item">' + data.menu.services + '</a></li>',
              '<li><a class="nav-item">' + data.menu.contact + '</a></li>',
            '</ul>',
          '</div><!-- #Header -->'
  ].join('');
  return header;
};
