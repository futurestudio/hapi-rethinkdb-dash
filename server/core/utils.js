var _                   = require('lodash'),
    Boom                = require('boom'),
    when                = require('when'),
    utils;


/**
*
*/
utils = {
    /**
     * ## Check Object
     * Check an object passed to the API is not empty and in the correct format
     *
     * @param {Object} object
     * @returns {Promise(Object)} resolves to the original object if it checks out
     */
     checkObject: function(object) {
        if (_.isEmpty(object)) {
            return when.reject(Boom.badRequest('No data provided'));
        }

        return when.resolve(object);
    }
};

module.exports = utils;
