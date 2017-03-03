'use strict'

const Routes = require('./routes')

exports.register = function (server, options, next) {
  // declare dependencies
  server.dependency([ 'vision', 'inert', 'authentication' ])

  server.route(Routes)
  server.log('info', 'Plugin registered: user login & sign up')

  next()
}

exports.register.attributes = {
  name: 'user-login-signup',
  version: '1.0.0'
}
