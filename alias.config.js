'use strict'
/**
 * Created by jg on 4/3/2019.
 */

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('/src')
    }
  }
}
