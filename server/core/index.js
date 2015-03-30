// # Data API

var users               = require('./users'),
    when                = require('when'),
    Boom                = require('boom'),
    validator           = require('validator'),
    utils               = require('./utils'),
    _                   = require('lodash');

/**
* ## Public API
*/
module.exports = {
    /**
     * @returns User api
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
            if (_.isEmpty(user.output)) {
                return when.resolve(user);
            }

            throw new Boom.unauthorized('Authorization required');
        }).catch(function(error) {
            return when.reject(error);
        });
    }
};
