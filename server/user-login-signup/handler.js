'use strict'

const _ = require('lodash')
const Joi = require('joi')
const Core = require('./../core')
let Users

/**
 * User controller: web routes related to user stuff get routed to this controller
 * Handles the session configuration and rendering of views with data
 */
Users = {
  /**
   * Renders sign up view if not authenticated, else redirects to profile page
   */
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

  /**
   * Renders sign up view if not authenticated, else redirects to profile page
   */
  signup: {
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        return reply.redirect('/profile')
      }

      return Core.users.create(request.payload).then(function (data) {
        request.cookieAuth.set(data)
        return reply.redirect('/profile')
      }).catch(function (error) {
        console.log(error)
        return reply.view('signup', { errormessage: error.output.payload.message }).code(400)
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

        console.log(data)

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
    handler: function (request, reply) {
      if (request.auth.isAuthenticated) {
        return reply.redirect('/profile')
      }

      var data = {
        email: request.payload.email_username,
        password: request.payload.password
      }

      return Core.users.login(data).then(function (data) {
        request.cookieAuth.set(data)
        return reply.redirect('/profile')
      }).catch(function (error) {
        return reply.view('login', { errormessage: error.output.payload.message })
      })
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
