'use strict'

const Hapi = require('hapi')
const Config = require('./server/config/settings')
const Plugins = require('./server/config/plugins')

// Create hapi server instance
const server = new Hapi.Server({
  debug: {
    request: [ 'error', 'uncaught' ]
  }
})

// add connection parameters
server.connection({
  host: 'localhost',
  port: process.env.PORT || Config.port,
  routes: { log: true }
})

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
server.register(Plugins, function (err) {
  if (err) {
    throw err
  }

  server.views(Config.hapi.options.views);

  // Start the server
  server.start(function (err) {
    if (err) {
      throw err
    }

    // Log to the console the host and port info
    server.log('info', 'Server started at: ' + server.info.uri)
  })

})
