'use strict'

const _ = require('lodash')
const Boom = require('boom')
const When = require('when')
let Utils

/**
 * Core helper functions
 */
Utils = {
  /**
   * Check if passed object passed is not empty and in the correct format
   *
   * @param       {Object} object
   * @returns     {Promise(Object)} resolves to the original object
   */
  checkObject: function (object) {
    if (_.isEmpty(object)) {
      return When.reject(Boom.badRequest('No data provided'))
    }

    return When.resolve(object)
  }
}

module.exports = Utils
