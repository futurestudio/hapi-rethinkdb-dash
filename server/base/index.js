'use strict'

const Routes = require('./routes')

exports.register = function (server, options, next) {
  // declare dependencies
  server.dependency([ 'vision', 'inert', 'authentication' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: base routes & assets')

  next()
}

exports.register.attributes = {
  name: 'base',
  version: '1.0.0'
}
