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
            return reply(api.users.find());
        }
    },

    /**
    *
    * @returns User
    */
    findById: {
        handler: function(request, reply) {
            var user_id = request.params.user_id;
            return reply(api.users.findById(user_id));
        }
    },

    /**
    * @returns User
    */
    create: {
        handler: function(request, reply) {
            var res = api.users.create(request.payload);
            return reply(res);
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
