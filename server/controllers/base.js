// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {
    index: {
        handler: function(request, reply) {
            // Render the view with the custom greeting
            var context = {
                title: 'Views Example',
                message: 'Hello, World'
            };

            return reply.view('index', context);
        }
    },
    about: {
        handler: function(request, reply) {
            reply.view('about', { title: 'This is the example about page' });
        }
    },
    missing: {
        handler: function(request, reply) {
            reply.view('404', {
                title: 'You found a missing page, but won the 404 error!'
            }).code(404);
        }
    }
};
