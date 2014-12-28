// # Data API

var users               = require('./users');

/**
* ## Public API
*/
module.exports = {
    users: users,

    processRequest: function(request) {
        // TODO
        // Check request data and provide a standardized object
        // the object should include header parameters, request body (payload), etc
        return null;
    }
};
