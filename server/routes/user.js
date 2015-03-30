var requireDirectory = require('require-directory'),
    routes;

routes = function() {
    var controller  = requireDirectory(module, __dirname + '/../controllers'),
        api         = requireDirectory(module, __dirname + '/../api');

    var routeTable = [
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
