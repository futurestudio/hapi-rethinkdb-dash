var requireDirectory = require('require-directory'),
    routes;

routes = function() {
    // bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
    var controller = requireDirectory(module, __dirname + '/../controllers');

    // array of routes for Hapi
    var routeTable = [
        // {
        //     method: 'GET',
        //     path: '/users',
        //     config: controller.users.find
        // },
        // {
        //     method: 'GET',
        //     path: '/users/{user_id}',
        //     config: controller.users.findById
        // },
        // {
        //     method: 'POST',
        //     path: '/users',
        //     config: controller.users.create
        // },
        // {
        //     method: 'PUT',
        //     path: '/users',
        //     config: controller.users.update
        // },
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
        }
    ];

    return routeTable;
};

module.exports = routes;
