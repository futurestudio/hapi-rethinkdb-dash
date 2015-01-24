var core                 = require('../core'),
    _                   = require('lodash'),
    users;


/**
*
*/
users = {
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

            return core.users.create(request.payload).then(function (data) {
                request.auth.session.set(data);
                return reply.redirect('/profile');
            }).catch(function(error) {
                return reply.view('signup', { errormessage: error.output.payload.message });
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

            return core.users.login(data).then(function (data) {
                request.auth.session.set(data);
                return reply.redirect('/profile');
            }).catch(function(error) {
                return reply.view('login', { errormessage: error.output.payload.message });
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
            return reply.view('user/profile', {user: request.auth.credentials});
        },
        auth: 'session'
    },

    /**
    *
    * @returns User
    */
    showChangePassword: {
        handler: function(request, reply) {
            return reply.view('user/change-password', {user: request.auth.credentials});
        },
        auth: 'session'
    },

    /**
    *
    * @returns User
    */
    changePassword: {
        handler: function(request, reply) {
            var user = request.auth.credentials;

            return core.users.changePassword(user, request.payload).then(function(data) {
                request.auth.session.set(data);
                return reply.redirect('/profile/change-password', { successmessage: 'Baam. Bitches!' });
            }).catch(function(error) {
                console.log('error');
                console.log(error);
                console.log(error.output.payload.message);
                return reply.view('user/change-password', { errormessage: error.output.payload.message });
            });
        },
        auth: 'session'
    },

    /**
    * @returns User
    */
    update: {
        handler: function(request, reply) {
            var user = request.auth.credentials;

            return core.users.update(user, request.payload).then(function (data) {
                request.auth.session.set(data);
                return reply.redirect('/profile');
            }).catch(function(error) {
                return reply.redirect('/profile', { errormessage: error.output.payload.message });
            });
        },
        auth: 'session'
    },

    /**
    * @returns
    */
    delete: {
        handler: function(request, reply) {
            var user = request.auth.credentials;

            return core.users.delete(user).then(function(data) {
                request.auth.session.clear();
                return reply.view('signup', {successmessage : data.message});
            }).catch(function(error) {
                console.log(error);
                return reply.view('user/change-password', { errormessage: error.output.payload.message });
            });
        },
        auth: 'session'
    }
};

module.exports = users;
