'use strict'

// # IsAdmin Helper
// Usage: `{{#isAdmin}}`
// Checks whether the user has admin or owner rule
const _ = require('lodash')
let isAdmin

isAdmin = function (options) {
  options = options || {}

  const user = options.data.root.user || {}

  if (_.includes([ user.scope ], 'admin')) {
    return options.fn(this)
  }

  return options.inverse(this)
}

module.exports = isAdmin
