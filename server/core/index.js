var users               = require('./users'),
    when                = require('when'),
    Boom                = require('boom'),
    validator           = require('validator'),
    utils               = require('./utils'),
    _                   = require('lodash');

/**
 * Index file comprising the core functionality. Exports user core and
 * additional core helper functions
 */
module.exports = {
    /**
     * @returns user core functions
     */
    users: users,
    
    /**
     * Check if provided authentication token exists in database
     */
    isAuthorized: function(object) {
        if (_.isEmpty(object.auth_token)) {
            throw new Boom.badRequest('Authorization required');
        }

        users.findByAuthToken(object.auth_token).then(function(user) {
            return when.resolve(user);
        }).catch(function(error) {
            return when.reject(new Boom.unauthorized('Authorization required'));
        });
    }
};
