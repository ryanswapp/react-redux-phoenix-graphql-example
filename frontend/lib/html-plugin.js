var defaultHtml = function (data) {
  return [
    '<!doctype html>',
      '<meta charset="utf-8"/>',
      '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>',
    '<body><div id="app"></div></body>',
    '<script src="' + data.main + '"></script>'
  ].join('')
}

/**
 * Liberally borrowed & tweaked from Henrik Joreteg:
 * https://github.com/HenrikJoreteg/hjs-webpack/blob/master/lib/html-plugin.js
 */
function HJSPlugin (options) {
  this.config = options || {}
  this.filename = options.filename || 'index.html'
}

HJSPlugin.prototype.apply = function (compiler) {
  var self = this
  var htmlFunction = this.config.html || defaultHtml

  self.compiler = compiler

  compiler.plugin('emit', function (compiler, callback) {

    // store stats on self
    self.stats = compiler.getStats().toJson()
    var assets = self.getAssets()

    // handle both sync and async versions
    if (htmlFunction.length === 2) {
      htmlFunction(assets, function (err, result) {
        if (err) throw err
        self.addAssets(compiler, result)
        callback()
      })
    } else {
      self.addAssets(compiler, htmlFunction(assets))
      callback()
    }
  })
}

// Oddly enough we have to pass in the compiler here
// it's changed from when it was stored on `this` previously
HJSPlugin.prototype.addAssets = function (compiler, data) {
  var dataType = typeof data
  var pages

  // if it's a string, we assume it's an html
  // string for the index file
  if (dataType === 'string') {
    pages = {}
    pages[this.filename] = data
  } else if (dataType === 'object') {
    pages = data
  } else {
    throw new Error('Result from `html` callback must be a string or an object')
  }

  for (var name in pages) {
    compiler.assets[name] = (function (asset) {
      return {
        source: function () {
          return asset
        },
        size: function () {
          return asset.length
        }
      }
    }(pages[name]))
  }
}

HJSPlugin.prototype.getAssets = function () {
  var assets = this.assets = {}
  var value, chunk

  for (chunk in this.stats.assetsByChunkName) {
    value = this.stats.assetsByChunkName[chunk]

    // Webpack outputs an array for each chunk when using sourcemaps
    if (value instanceof Array) {

      // if we've got a CSS file add it here
      if (chunk === 'app') {
        assets.css = value[1]
      }

      // Is the main bundle seems like it's always the first
      value = value[0]
    }

    assets[chunk] = value
  }

  return assets
}

module.exports = HJSPlugin