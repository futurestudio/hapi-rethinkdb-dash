var requireDirectory = require('require-directory'),
    routes;

routes = function() {
    var controller = requireDirectory(module, __dirname + '/../controllers');

    // array of routes for Hapi
    var routeTable = [
        {
            method: 'GET',
            path: '/',
            config: controller.base.index
        },
        {
            method: 'GET',
            path: '/{path*}',
            config: controller.base.missing
        },
        {
            method: 'GET',
            path: '/images/{path*}',
            config: controller.assets.images
        },
        {
            method: 'GET',
            path: '/css/{path*}',
            config: controller.assets.css
        },
        {
            method: 'GET',
            path: '/js/{path*}',
            config: controller.assets.js
        }
    ];

    return routeTable;
};

module.exports = routes;
