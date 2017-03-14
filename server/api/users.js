'use strict'

const api = require('../core')
let when = require('when')
let _ = require('lodash')
let User = require('./../models').User
let that = this
let users

/**
 *
 */
users = {
  /**
   *
   * @returns User
   */
  findById: {
    handler: function (request, reply) {
      return User.findById(request.params.user_id).then(function (user) {
        return reply(transformReply(user))
      })
    }
  },

  /**
   *
   * @returns User
   */
  findByEmail: {
    handler: function (request, reply) {
      const email = request.payload.email
      return User.findByEmail(email).then(function (user) {
        return reply(transformReply(user))
      })
    }
  },

  /**
   * @returns User
   */
  login: {
    handler: function (request, reply) {
      return api.users.login(request.payload).then(function (data) {
        return reply(transformReply(data))
      }).catch(function (error) {
        return reply(error)
      })
    }
  },

  /**
   * @returns User
   */
  create: {
    handler: function (request, reply) {
      return api.users.create(request.payload).then(function (data) {
        return reply(data).code(201)
      }).catch(function (error) {
        return reply(error)
      })
    }
  },

  /**
   * @returns User
   */
  update: {
    handler: function (request, reply) {
      return api.users.update(request.payload).then(function (data) {
        return reply(data)
      })
    }
  },

  /**
   * @returns User
   */
  delete: {
    handler: function (request, reply) {
      return reply().statusCode(501)
    }
  }
}

function transformReply (data) {
  delete data.password
  delete data.password_reset_token
  delete data.password_reset_deadline
  delete data.auth_token_issued
  delete data.email_verification

  return data
}

module.exports = users
