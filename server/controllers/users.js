var api                 = require('../api'),
    _                   = require('lodash'),
    users;


/**
*
*/
users = {
    /**
    *
    */
    find: {
        handler: function(request, reply) {
            return api.users.find().then(function(data) {
                return reply(data);
            });
        }
    },

    /**
    *
    * @returns User
    */
    findById: {
        handler: function(request, reply) {
            var userId = request.params.user_id;
            return api.users.findById(userId).then(function (data) {
                return reply(data);
            });
        }
    },

    /**
    *
    * @returns User
    */
    findByEmail: {
        handler: function(request, reply) {
            var email = request.payload.email;
            return api.users.findByEmail(email).then(function (data) {
                return reply(data);
            });
        }
    },

    /**
    * @returns User
    */
    create: {
        handler: function(request, reply) {
            return api.users.create(request.payload).then(function (data) {
                if (_.isEmpty(data.output)) {
                    return reply(data).code(201);
                }

                return reply(data);
            });
        }
    },

    /**
    * @returns User
    */
    login: {
        handler: function(request, reply) {
            return api.users.login(request).then(function (data) {
                if (_.isEmpty(data.output)) {
                    request.auth.session.set(data);
                    return reply(data).code(200);
                }

                return reply(data);
            });
        }
    },

    /**
    *
    * @returns User
    */
    logout: {
        handler: function(request, reply) {
            request.auth.session.clear();
            return reply.redirect('/');
        },
        auth: 'session'
    },

    /**
    *
    * @returns User
    */
    profile: {
        handler: function(request, reply) {

        },
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: '/login'
            }
        }
    },

    /**
    * @returns User
    */
    update: function() {

    },

    /**
    * @returns
    */
    delete: function() {

    }
};

module.exports = users;
