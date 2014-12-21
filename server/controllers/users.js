var api                 = require('../api'),
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
    * @returns User
    */
    create: {
        handler: function(request, reply) {
            return api.users.create(request.payload).then(function (data) {
                return reply(data).code(201);
            });
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
