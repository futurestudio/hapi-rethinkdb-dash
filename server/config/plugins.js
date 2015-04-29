var plugins = function(server) {
    // options to pass into the 'good' logging plugin
    var goodOptions = {
        reporters: [{
            reporter: require('good-console'),
            events: { log: '*', response: '*' }
        }]
    };

    /**
     * Register plugins to hapi server
     */
    server.register([
        {
            register: require('good'),
            options: goodOptions
        },
        {
            register: require('hapi-auth-cookie')
        }
    ], function(err) {
        if (err) {
            throw err;
        }
    });

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
        password: 'thisisasecretpassword',
        cookie: 'hapi-rethink-dash',
        redirectTo: '/login',
        isSecure: false
    });
};

module.exports = plugins;
