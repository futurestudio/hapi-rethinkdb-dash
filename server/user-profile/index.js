'use strict'

const Routes = require('./routes')

exports.register = function (server, options, next) {
  // declare dependencies
  server.dependency([ 'vision', 'inert', 'authentication' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: user profile')

  next()
}

exports.register.attributes = {
  name: 'user-profile',
  version: '1.0.0'
}
