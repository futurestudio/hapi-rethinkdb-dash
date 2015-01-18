var requireDirectory = require('require-directory'),
    routes;

routes = function(server) {
    // bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
    var controller = requireDirectory(module, __dirname + '/../controllers');

    // array of routes for Hapi
    var routeTable = [
        // {
        //     method: 'GET',
        //     path: '/users/{user_id}',
        //     config: {
        //         handler: function(request, reply) {
        //             return api.users.findById(request.params.user_id).then(function (data) {
        //                 if (_.isEmpty(data.output)) {
        //                     request.auth.session.set(data);
        //                     return reply.redirect('/profile');
        //                 }
        //
        //                 console.log(data);
        //
        //                 return reply.view('signup', { errormessage: data.output.payload.message });
        //             });
        //         }
        //     }
        // },
        // {
        //     method: 'POST',
        //     path: '/users',
        //     config: controller.users.create
        // },
        // {
        //     method: 'GET',
        //     path: '/login',
        //     config: controller.users.showLogin
        // },
        // {
        //     method: 'GET',
        //     path: '/signup',
        //     config: controller.users.showSignup
        // },
        // {
        //     method: 'POST',
        //     path: '/signup',
        //     config: controller.users.signup
        // },
        // {
        //     method: 'POST',
        //     path: '/login',
        //     config: controller.users.login
        // },
        // {
        //     method: 'GET',
        //     path: '/logout',
        //     config: controller.users.logout
        // },
        // {
        //     method: 'GET',
        //     path: '/profile',
        //     config: controller.users.profile
        // }
    ];

    return routeTable;
};

module.exports = routes;
