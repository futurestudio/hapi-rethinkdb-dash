'use strict'

exports.register = function (server, options, next) {
  // declare dependencies
  server.dependency([ 'hapi-auth-cookie' ])

  /**
   * Register authentication strategies to hapi server
   *
   * We’re using hapi-auth-cookie plugin to store user information on
   * client side to remember user data on every website visit
   *
   * For sure, we could and will add more authentication strategies.
   * What’s next: JWT (we highly welcome pull requests to add JWT functionality!)
   */
  server.auth.strategy('session', 'cookie', {
    password: 'ThisIsASecretPasswordThisIsASecretPassword',
    cookie: 'hapi-rethink-dash',
    redirectTo: '/login',
    isSecure: false
  });

  server.log('info', 'Plugin registered: cookie authentication with strategy »session«')

  next()
}

exports.register.attributes = {
  name: 'authentication',
  version: '1.0.0'
}
