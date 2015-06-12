var hapi        = require('hapi'),
    config      = require('./server/config/settings');

// Create hapi server instance
var server = new hapi.Server();

// add connection parameters
server.connection({
    host: 'localhost',
    port: process.env.PORT || config.port
});

server.views(config.hapi.options.views);

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
require('./server/config/plugins')(server);

// Require the routes and pass the server object.
var baseRoutes = require('./server/routes/base')();
var userRoutes = require('./server/routes/user')();
var dashboardRoutes = require('./server/routes/dashboard')();
server.route(baseRoutes);
server.route(userRoutes);
server.route(dashboardRoutes);

// Start the server
server.start(function(err) {
    if (err) {
        throw err;
    }

    // Log to the console the host and port info
    console.log('Server started at: ' + server.info.uri);
});
