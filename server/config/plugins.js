var plugins = function(server) {
    // options to pass into the 'good' logging plugin
    var goodOptions = {
        subscribers: {
            console: ['ops', 'request', 'log', 'error'],
            'tmp/logs/': ['ops', 'request', 'log', 'error']
        }
    };

    // the assets configuaration options
    var assetOptions = require('../../assets');

    server.pack.register([
        {
            plugin: require("good"),
            options: goodOptions
        },
        {
            plugin: require("hapi-assets"),
            options: assetOptions
        },
        {
            plugin: require("hapi-named-routes")
        },
        {
            plugin: require("hapi-cache-buster")
        }
    ], function(err) {
        if (err) throw err;
    });
};

module.exports = plugins;
