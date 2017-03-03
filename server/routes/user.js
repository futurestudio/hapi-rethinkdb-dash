var requireDirectory = require('require-directory'),
    routes;

routes = function() {
    var controller  = requireDirectory(module, __dirname + '/../controllers'),
        api         = requireDirectory(module, __dirname + '/../api');

    var routeTable = [


    ];

    return routeTable;
};

module.exports = routes;
