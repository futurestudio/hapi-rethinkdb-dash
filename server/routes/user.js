var requireDirectory = require('require-directory'),
    routes;

routes = function() {
    // bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
    var controller  = requireDirectory(module, __dirname + '/../controllers'),
        api         = requireDirectory(module, __dirname + '/../api');

    // array of routes for Hapi
    var routeTable = [
        // API routes
        {
            method: 'POST',
            path: '/api/login',
            config: api.users.login
        },
        {
            method: 'GET',
            path: '/api/users',
            config: api.users.find
        },
        {
            method: 'GET',
            path: '/api/users/{user_id}',
            config: api.users.findById
        },
        {
            method: 'POST',
            path: '/api/users',
            config: api.users.create
        },
        {
            method: 'PUT',
            path: '/api/users',
            config: api.users.update
        },

        // web routes
        {
            method: 'GET',
            path: '/login',
            config: controller.users.showLogin
        },
        {
            method: 'POST',
            path: '/login',
            config: controller.users.login
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
            method: 'GET',
            path: '/logout',
            config: controller.users.logout
        },
        {
            method: 'GET',
            path: '/profile',
            config: controller.users.profile
        },
        {
            method: 'POST',
            path: '/profile',
            config: controller.users.update
        },
        {
            method: 'GET',
            path: '/profile/change-password',
            config: controller.users.showChangePassword
        },
        {
            method: 'POST',
            path: '/profile/change-password',
            config: controller.users.changePassword
        },
        {
            method: 'POST',
            path: '/profile/delete-account',
            config: controller.users.delete
        }

    ];

    return routeTable;
};

module.exports = routes;
