var plugins = function(server) {
    // options to pass into the 'good' logging plugin
    var goodOptions = {
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*' }]
        }]
    };

    server.register([
        {
            register: require("good"),
            options: goodOptions
        }
    ], function(err) {
        if (err) throw err;
    });
};

module.exports = plugins;
