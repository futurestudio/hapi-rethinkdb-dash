var requireDirectory = require('require-directory'),
    routes;

routes = function(server) {
    // bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
    var controller = requireDirectory(module, __dirname + '/../controllers');

    // array of routes for Hapi
    var routeTable = [
        {
            method: 'GET',
            path: '/users',
            config: controller.users.find
        },
        {
            method: 'GET',
            path: '/users/{user_id}',
            config: controller.users.findById
        },
        {
            method: 'POST',
            path: '/users',
            config: controller.users.create
        }
    ];

    return routeTable;
};

module.exports = routes;
