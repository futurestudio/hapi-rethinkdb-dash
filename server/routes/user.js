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
        },
        {
            method: 'GET',
            path: '/login',
            config: controller.users.showLogin
        },
        {
            method: 'GET',
            path: '/signup',
            config: controller.users.showSignup
        },
        {
            method: 'POST',
            path: '/signup',
            config: controller.users.signup
        },
        {
            method: 'POST',
            path: '/login',
            config: controller.users.login
        },
        {
            method: 'GET',
            path: '/logout',
            config: controller.users.logout
        },
        {
            method: 'GET',
            path: '/profile',
            config: controller.users.profile
        }
    ];

    return routeTable;
};

module.exports = routes;