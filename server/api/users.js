var User                = require('../models/user'),
    errors              = require('../errors'),
    users;


/**
*
*/
users = {
    /**
    *
    */
    find: function() {
        return User.get().run().then(function (users) {
            if (users) {
                return users.toJSON();
            }

            return new errors.NotFoundError('Users not found.');
        });
    },

    /**
    *
    * @returns User
    */
    findById: function(id) {
        return User.get(id).run().then(function (user) {
            if (user) {
                return user.toJSON();
            }

            return new errors.NotFoundError('User not found.');
        });
    },

    /**
     * @returns User
     */
    create: function() {

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
