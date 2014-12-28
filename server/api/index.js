// # Data API

var users               = require('./users'),
    when                = require('when'),
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
            resolve(null);
        });
    }
};
