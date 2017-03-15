'use strict'

const Joi = require('joi')
const _ = require('lodash')
const User = require('./../models').User
let Users

Users = {
  profile: {
    handler: function (request, reply) {
      return reply.view('user/profile', { user: request.auth.credentials })
    },
    auth: 'session'
  },

  showChangePassword: {
    handler: function (request, reply) {
      return reply.view('user/change-password', { user: request.auth.credentials })
    },
    auth: 'session'
  },

  changePassword: {
    auth: 'session',
    handler: function (request, reply) {
      const payload = request.payload
      const user = request.auth.credentials

      User.findById(user.id).then(function (user) {
        return user.comparePassword(payload.old_password)
      }).then(function (user) {
        user.password = payload.new_password
        return user.generatePassword()
      }).then(function (user) {
        return user.generateAuthToken()
      }).then(function (user) {
        return user.save()
      }).then(function (user) {
        request.cookieAuth.set(user)
        return reply.view('user/change-password', { successmessage: 'Password change successful.' })
      }).catch(function (error) {
        const status = error.isBoom ? error.output.statusCode : 400
        return reply.view('user/change-password', { errormessage: error.message }).code(status)
      })
    },
    validate: {
      payload: {
        old_password: Joi.string().required().min(6).label('Old Password'),
        new_password: Joi.string().required().min(6).label('New Password'),
        confirm_new_password: Joi
          .any().required().label('New Password Confirm')
          .valid(Joi.ref('new_password')).options({ language: { any: { allowOnly: 'must match password' } } })
      },
      options: {
        abortEarly: false
      },
      failAction: function (request, reply, source, error) {
        // extracts the key which caused the failed validation ("email" or "password")
        const errorKey = error.data.details[ 0 ].path
        error[ errorKey ] = {
          // Use the Joi error message
          message: error.data.details[ 0 ].message
        }

        const values = error.data._object
        const data = {
          values: values,
          errors: error
        }

        return reply.view('user/change-password', data).code(400)
      }
    }
  },

  /**
   * Performs the update user operation
   */
  update: {
    auth: 'session',
    handler: function (request, reply) {
      const user = request.auth.credentials

      User.findById(user.id).then(function (user) {
        Object.assign(user, request.payload)

        user.save().then(function (doc) {
          request.cookieAuth.set(doc)
          return reply.view('user/profile', { successmessage: 'Profile update successful.', user: doc })
        })
      }).catch(function (error) {
        const status = error.isBoom ? error.output.statusCode : 400
        return reply.view('user/profile', { errormessage: error.message }).code(status)
      })
    },
    validate: {
      payload: {
        name: Joi.string().allow('').optional().label('Name'),
        url: Joi.string().allow('').optional().uri().label('Url')
      },
      options: {
        abortEarly: false
      },
      failAction: function (request, reply, source, error) {
        // extracts the key which caused the failed validation ("email" or "password")
        const errorKey = error.data.details[ 0 ].path
        error[ errorKey ] = {
          // Use the Joi error message
          message: error.data.details[ 0 ].message
        }

        const values = error.data._object
        const data = {
          values: values,
          errors: error
        }

        return reply.view('user/profile', data).code(400)
      }
    }
  }
}

module.exports = Users
