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
     * @returns Promise(Request)
     */
    processRequest: function(request) {
        var req = {};

        // TODO
        // Check request data and provide a standardized object
        // the object should include header parameters, auth token, request body (payload), etc
        return when.promise(function(resolve, reject, notify) {
            return utils.checkObject(request.headers.Accept).then(function(acceptheader) {
                req.version = acceptheader;
                return req;
            }).then(function(req) {
                return utils.checkObject(request.headers.Content-Range).then(function(range) {
                    req.range = range;
                    return req;
                });
            }).then(function(req) {
                return utils.checkObject(request.headers.Authorization).then(function(auth_token) {
                    req.auth_token = auth_token;
                    return req;
                });
            }).then(function(req) {
                return utils.checkObject(request.payload).then(function(data) {
                    req.body = data;
                    return req;
                });
            }).then(function(req) {
                resolve(req);
            }).catch(function(error) {
                return reject(error);
            });
        });
    },


    /**
     * Check if provided authentication token exists in database
     *
     */
    isAuthorized: function(object) {
        if (_.isEmpty(object.auth_token)) {
            throw new Boom.badRequest('Authorization required');
        }

        users.findByAuthToken(object.auth_token).then(function(user) {
            console.log(user);

            if (_.isEmpty(user.output)) {
                return user;
            }

            throw new Boom.unauthorized('Authorization required');
        }).catch(function(error) {
            return error;
        });
    }
};
