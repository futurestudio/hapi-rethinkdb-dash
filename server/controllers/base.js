module.exports = {
    index: {
        handler: function(request, reply) {
            var context = {
                title: 'This is Index!',
                message: 'Hello, World. You crazy handlebars layout',
                user: request.auth.credentials
            };

            return reply.view('index', context);
        },
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        }
    },
    missing: {
        handler: function(request, reply) {
            return reply.view('404', {
                title: 'You found a missing page, but won the 404 error!'
            }).code(404);
        }
    }
};
