var _                   = require('lodash'),
    Boom                = require('boom'),
    when                = require('when'),
    validator           = require('validator'),
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
    * Find user by email
    *
    * @returns User
    */
    findByEmail: function(email) {
        if (_.isEmpty(email)) {
            return Boom.badRequest('Email missing.');
        }

        if ( ! validator.isEmail(email)) {
            return when.reject(Boom.badRequest('Email address required.'));
        }

        return User.filter({email: email}).run().then(function (user) {
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
            if ( ! validator.isEmail(userdata.email)) {
                return when.reject(Boom.badRequest('Email address missing.'));
            }

            if ( ! validator.isLength(userdata.password, 6)) {
                return when.reject(Boom.badRequest('Password must be at least 6 characters.'));
            }

            user = new User(userdata);

            return user.generatePassword().then(function(user) {
                return User.filter({email: user.email}).run().then(function(foundUsers) {
                    if (_.isEmpty(foundUsers)) {
                        return user.save().then(function (doc) {
                            return doc;
                        }).error(function (error) {
                            if (error) {
                                return when.reject(error);
                            }

                            return when.reject(Boom.badImplementation('An error occured while creating the user.'));
                        });
                    } else {
                        return when.reject(Boom.badRequest('User is already registered.'));
                    }
                });
            });
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
