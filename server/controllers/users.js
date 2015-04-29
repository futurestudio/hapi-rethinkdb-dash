var core                 = require('../core'),
    _                   = require('lodash'),
    users;


/**
* User controller: web routes related to user stuff get routed to this controller
* Handles the session configuration and rendering of views with data
*/
users = {
    /**
    * Renderes signup view if not authenticated, else redirects to profile page
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
    * Renderes signup view if not authenticated, else redirects to profile page
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
    * Renderes login view if not authenticated, else redirects to profile page
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
    * Renderes login view if not authenticated, else redirects to profile page
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
    * Clears the user session and performs user logout
    */
    logout: {
        handler: function(request, reply) {
            request.auth.session.clear();
            return reply.redirect('/');
        },
        auth: 'session'
    },

    /**
    * Renderes profile page
    */
    profile: {
        handler: function(request, reply) {
            return reply.view('user/profile', {user: request.auth.credentials});
        },
        auth: 'session'
    },

    /**
    *
    * Renderes change password page
    */
    showChangePassword: {
        handler: function(request, reply) {
            return reply.view('user/change-password', {user: request.auth.credentials});
        },
        auth: 'session'
    },

    /**
    * Performs the change password operation
    */
    changePassword: {
        handler: function(request, reply) {
            var user = request.auth.credentials;

            return core.users.changePassword(user, request.payload).then(function(data) {
                request.auth.session.set(data);
                return reply.view('user/change-password', { successmessage: 'Password change successful.' });
            }).catch(function(error) {
                return reply.view('user/change-password', { errormessage: error.output.payload.message });
            });
        },
        auth: 'session'
    },

    /**
    * Performs the update user operation
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
    * Performs the delete user operation
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
