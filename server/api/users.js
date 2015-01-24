var api                 = require('../core'),
    when                = require('when'),
    _                   = require('lodash'),
    that                = this,
    users;


/**
*
*/
users = {
    /**
    *
    * @returns User
    */
    find: {
        handler: function(request, reply) {
            return api.users.find().then(function (data) {
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
            return api.users.findById(request.params.user_id).then(function (data) {
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
    login: {
        handler: function(request, reply) {
            return api.users.login(request.payload).then(function (data) {
                return reply(transformReply(data));
            }).catch(function(error) {
                return reply(error);
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
    update: {
        handler: function(request, reply) {
            return api.users.update(request.payload).then(function (data) {
                return reply(data);
            });
        }
    },

    /**
    * @returns User
    */
    delete: {
        handler: function(request, reply) {
            return reply().statusCode(501);
        }
    }
};

function transformReply(data) {
    delete data.password;
    delete data.password_reset_token;
    delete data.password_reset_deadline;
    delete data.auth_token_issued;
    delete data.email_verification;

    return data;
}

module.exports = users;
