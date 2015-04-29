var _                   = require('lodash'),
    Boom                = require('boom'),
    when                = require('when'),
    utils;


/**
* Core helper functions
*/
utils = {
    /**
     * Check if passed object passed is not empty and in the correct format
     *
     * @param       {Object} object
     * @returns     {Promise(Object)} resolves to the original object
     */
     checkObject: function(object) {
        if (_.isEmpty(object)) {
            return when.reject(Boom.badRequest('No data provided'));
        }

        return when.resolve(object);
    }
};

module.exports = utils;
