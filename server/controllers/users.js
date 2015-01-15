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
    showSignup: {
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.redirect('/profile');
            }

            return reply.view('signup');
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

    /**
    * @returns User
    */
    signup: {
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.redirect('/profile');
            }

            return api.users.create(request.payload).then(function (data) {
                if (_.isEmpty(data.output)) {
                    request.auth.session.set(data);
                    return reply.redirect('/profile');
                }

                return reply.view('signup', { errormessage: data.output.payload.message });
            });
        }
    },

    /**
    * @returns User
    */
    showLogin: {
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.redirect('/profile');
            }

            return reply.view('login');
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

    /**
    * @returns User
    */
    login: {
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.redirect('/profile');
            }

            var data = {
                email: request.payload.email_username,
                password: request.payload.password
            };

            return api.users.login(data).then(function (data) {
                if (_.isEmpty(data.output)) {
                    request.auth.session.set(data);
                    return reply.redirect('/profile');
                }

                return reply.view('login', { errormessage: data.output.payload.message });
            });
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
            return reply.view('user/profile', request.auth.credentials);
        },
        auth: 'session'
    },

    /**
    * @returns User
    */
    update: {
        handler: function(request, reply) {
            var user = request.auth.credentials;

            return api.users.update(user, request.payload).then(function (data) {
                if (_.isEmpty(data.output)) {
                    request.auth.session.set(data);
                    return reply.redirect('/profile');
                }

                return reply.redirect('/profile', { errormessage: data.output.payload.message });
            });
        },
        auth: 'session'
    },

    /**
    * @returns
    */
    delete: {
        handler: function(request, reply) {
            return reply.view('404');
        },
        auth: 'session'
    }
};

module.exports = users;
