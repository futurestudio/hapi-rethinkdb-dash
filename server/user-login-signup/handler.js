'use strict'

const _ = require('lodash')
const Joi = require('joi')
const Boom = require('boom')
const Promise = require('when')
const User = require('./../models').User
let Users

/**
 * User controller: web routes related to user stuff get routed to this controller
 * Handles the session configuration and rendering of views with data
 */
Users = {
  showSignup: {
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        return reply.redirect('/profile')
      }

      return reply.view('signup')
    },
    auth: {
      mode: 'try',
      strategy: 'session'
    },
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    }
  },

  signup: {
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        return reply.redirect('/profile')
      }

      const payload = request.payload

      return User.findByEmail(payload.email).then(function (user) {
        if (!_.isEmpty(user)) {
          return Promise.reject(Boom.conflict('E-Mail address is already registered.'))
        }

        user = new User({
          email: payload.email,
          password: payload.password,
          scope: [ 'user' ]
        })

        return user.generatePassword()
      }).then(function (user) {
        return user.save()
      }).then(function (user) {
        request.cookieAuth.set(user)
        return reply.redirect('/profile')
      }).catch(function (error) {
        const status = error.isBoom ? error.output.statusCode : 400
        return reply.view('signup', { errormessage: error.message }).code(status)
      })
    },
    validate: {
      payload: {
        email: Joi.string().required().label('Email address'),
        password: Joi.string().required().min(6).label('Password')
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

        return reply.view('signup', data).code(400)
      }
    }
  },

  /**
   * Renders login view if not authenticated, else redirects to profile page
   */
  showLogin: {
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        return reply.redirect('/profile')
      }

      return reply.view('login')
    },
    auth: {
      mode: 'try',
      strategy: 'session'
    },
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    }
  },

  /**
   * Renders login view if not authenticated, else redirects to profile page
   */
  login: {
    auth: {
      mode: 'try',
      strategy: 'session'
    },
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        return reply.redirect('/profile')
      }

      const payload = request.payload

      return User.findByEmail(request.payload.email).then(function (user) {
        return user.comparePassword(payload.password).then(function (isMatch) {
          return isMatch ? Promise.resolve(user) : Promise.reject('Password not correct')
        })
      }).then(function (user) {
        request.cookieAuth.set(user)

        return reply.redirect('/profile')
      }).catch(function (error) {
        return reply.view('login', { errormessage: error.message })
      })
    },
    validate: {
      payload: {
        email: Joi.string().required().label('Email address'),
        password: Joi.string().required().min(6).label('Password')
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

        return reply.view('login', data).code(400)
      }
    }
  },

  /**
   * Clears the user session and performs user logout
   */
  logout: {
    handler: function (request, reply) {
      request.cookieAuth.clear()
      return reply.redirect('/')
    },
    auth: 'session'
  }
}

module.exports = Users
