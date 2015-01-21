var api                 = require('../core'),
    _                   = require('lodash'),
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

};

module.exports = users;
