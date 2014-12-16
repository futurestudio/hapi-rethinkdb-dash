var _                   = require('lodash'),
    User                = require('../models/user'),
    Boom                = require('boom'),
    users;


/**
*
*/
users = {
    /**
    *
    */
    find: function() {
        return User.run().then(function (users) {
            if (users) {
                return users;
            }

            return Boom.notFound('No users found');
        }).error(function(error) {
            console.log(error);
        });
    },

    /**
    *
    * @returns User
    */
    findById: function(id) {
        if (_.isEmpty(id)) {
            return Boom.badRequest('User id missing');
        }

        return User.get(id).run().then(function (user) {
            if (user) {
                return user;
            }

            return Boom.notFound('User not found');
        }).error(function(e) {
            return Boom.badImplementation('An error occured while reading user data');
        });
    },

    /**
     * @returns User
     */
    create: function(new_user) {
        if (_.isEmpty(new_user) || _.isEmpty(new_user.email)) {
            return Boom.badRequest('User data missing');
        }

        var user = new User(new_user);
        return user.save().then(function (doc) {
            return doc;
        }).error(function (error) {
            return Boom.badImplementation('An error occured while creating the user');
        });
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
