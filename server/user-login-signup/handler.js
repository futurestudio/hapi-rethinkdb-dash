'use strict'

const Core = require('./../core')
const User = require('./../models').User
const _ = require('lodash')
const Joi = require('joi')
const Boom = require('boom')
const Promise = require('when')
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
        return reply.view('signup', { errormessage: error.output.payload.message })
      })
    },
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
      }
    }
  },

  /**
   * Renderes login view if not authenticated, else redirects to profile page
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
   * Renderes login view if not authenticated, else redirects to profile page
   */
  login: {
    auth: {
      mode: 'try',
      strategy: 'session'
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
        return reply.view('login', { errormessage: error.output.payload.message })
      })
    },
    plugins: {
      'hapi-auth-cookie': {
        redirectTo: false
      }
    },
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
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
