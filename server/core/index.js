'use strict'

const users = require('./users')

/**
 * Index file comprising the core functionality. Exports user core and
 * additional core helper functions
 */
module.exports = {
  /**
   * @returns user core functions
   */
  users: users
}
