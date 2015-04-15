var plugins = function(server) {
    // options to pass into the 'good' logging plugin
    var goodOptions = {
        reporters: [{
            reporter: require('good-console'),
            events: { log: '*', response: '*' }
        }]
    };

    server.register([
        {
            register: require('good'),
            options: goodOptions
        },
        {
            register: require('hapi-auth-cookie')
        }
    ], function(err) {
        if (err) throw err;
    });

    server.auth.strategy('session', 'cookie', {
        password: 'thisisasecretpassword',
        cookie: 'hapi-rethink-dash',
        redirectTo: '/login',
        isSecure: false
    });
};

module.exports = plugins;
