var _                   = require('lodash'),
    Boom                = require('boom'),
    when                = require('when'),
    User                = require('../models/user'),
    utils               = require('./utils'),
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
            return Boom.badImplementation('An error occured while reading user data');
        });
    },

    /**
    *
    * @returns User
    */
    findById: function(id) {
        if (_.isEmpty(id)) {
            return Boom.badRequest('User id missing.');
        }

        return User.get(id).run().then(function (user) {
            if (user) {
                return user;
            }

            return Boom.notFound('User not found.');
        }).error(function(e) {
            return Boom.badImplementation('An error occured while reading user data.');
        });
    },

    /**
     * @returns User
     */
    create: function(object) {
        var user;

        return utils.checkObject(object).then(function(userdata) {
            user = new User(userdata);
            return User.filter({email: user.email}).run().then(function(foundUsers) {
                if (_.isEmpty(foundUsers)) {
                    return user.save().then(function (doc) {
                        return doc;
                    }).error(function (error) {
                        return when.reject(Boom.badImplementation('An error occured while creating the user.'));
                    });
                } else {
                    return when.reject(Boom.badRequest('User is already registered.'));
                }
            });
        }).then(function() {
            return when.resolve(user);
        }).catch(function (error) {
            return error;
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
