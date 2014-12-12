var plugins = function(server) {
    // options to pass into the 'good' logging plugin
    var goodOptions = {
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*' }]
        }]
        //subscribers: {
        //    console: ['ops', 'request', 'log', 'error'],
        //    'tmp/logs/': ['ops', 'request', 'log', 'error']
        //}
    };

    // the assets configuaration options
    var assetOptions = require('../../assets');

    server.register([
        {
            register: require("good"),
            options: goodOptions
        },
        {
            register: require("hapi-assets"),
            options: assetOptions
        },
        {
            register: require("hapi-named-routes")
        },
        {
            register: require("hapi-cache-buster")
        }
    ], function(err) {
        if (err) throw err;
    });
};

module.exports = plugins;
