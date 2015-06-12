var requireDirectory = require('require-directory'),
    routes;

routes = function() {
    var controller  = requireDirectory(module, __dirname + '/../controllers');

    var routeTable = [
        {
            method: 'GET',
            path: '/dashboard',
            config: controller.dashboard.showDashboard
        }
    ];

    return routeTable;
};

module.exports = routes;
