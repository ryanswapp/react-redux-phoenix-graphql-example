var path = require('path');

module.exports = {
  dev: function (data) {
    return {
      'index.html': [
        '<html>',
          '<head>',
            '<meta charset="utf-8"/>',
            '<meta name="viewport" content="width=device-width, initial-scale=1">',
            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">',
            '<link href="./app/images/favicon.png" rel="icon" type="image/png" />',
          '</head>',
          '<body>',
            '<div id="app"></div>',
            '<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>',
            '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>',
            '<script src="/' + data.main + '"></script>',
          '</body>',
        '</html>'
      ].join('')
    }
  },

  prod: function (data) {
    var config = {
      title: 'React Starter Template'
    }

    return {
      'index.html': [
        '<html>',
          '<head>',
            '<meta charset="utf-8"/>',
            '<meta name="viewport" content="width=device-width, initial-scale=1">',
            '<title>' + config.title + '</title>',
            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">',
            '<link href="./style.css" rel="stylesheet" type="text/css" />',
            '<link href="./app/images/favicon.png" rel="icon" type="image/png" />',
          '</head>',
          '<body>',
            '<div id="app"></div>',
            '<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>',
            '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>',
            '<script src="./vendors.js"></script>',
            '<script src="./app.js"></script>',
          '</body>',
        '</html>'
      ].join('')
    }
  }
}