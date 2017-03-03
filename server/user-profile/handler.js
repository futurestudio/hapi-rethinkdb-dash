'use strict'

const Core = require('./../core')
const _ = require('lodash')
let Users

Users = {
  /**
   * Renderes profile page
   */
  profile: {
    handler: function(request, reply) {
      return reply.view('user/profile', {user: request.auth.credentials})
    },
    auth: 'session'
  },

  /**
   *
   * Renderes change password page
   */
  showChangePassword: {
    handler: function(request, reply) {
      return reply.view('user/change-password', {user: request.auth.credentials})
    },
    auth: 'session'
  },

  /**
   * Performs the change password operation
   */
  changePassword: {
    handler: function(request, reply) {
      const user = request.auth.credentials

      return Core.users.changePassword(user, request.payload).then(function(data) {
        request.cookieAuth.set(data)
        return reply.view('user/change-password', { successmessage: 'Password change successful.' })
      }).catch(function(error) {
        console.log(error)
        return reply.view('user/change-password', { errormessage: error.output.payload.message })
      })
    },
    auth: 'session'
  },

  /**
   * Performs the update user operation
   */
  update: {
    handler: function(request, reply) {
      const user = request.auth.credentials

      return Core.users.update(user, request.payload).then(function (data) {
        request.cookieAuth.set(data)
        return reply.view('user/profile', { successmessage: 'Data change successful.' })
      }).catch(function(error) {
        console.log(error)
        return reply.view('user/profile', { errormessage: error.output.payload.message })
      })
    },
    auth: 'session'
  },

  /**
   * Forgot password: sends an email with the new password if the user is already registered
   */
  showForgotPassword: {
    handler: function(request, reply) {
      return reply.view('forgot-password')
    }
  },

  /**
   * Forgot password: sends an email with the new password if the user is already registered
   */
  forgotPassword: {
    handler: function(request, reply) {
      // TODO: redirect to login if already authenticated?

      return Core.users.forgotPassword(request.payload).then(function(user) {
        return reply.view('forgot-password', {successmessage: 'Email sent successfully. Check your inbox!'})
      }).catch(function(error) {
        return reply.view('forgot-password', { errormessage: error.output.payload.message })
      })
    }
  },

  showResetPassword: {
    handler: function(request, reply) {
      return reply.view('reset-password', {resetToken: request.params.resetToken})
    }
  },

  resetPassword: {
    handler: function(request, reply) {
      // TODO: redirect to login if already authenticated?

      return Core.users.resetPassword(request.payload).then(function(user) {
        request.cookieAuth.set(user)
        return reply.redirect('/profile')

        //return reply.view('reset-password', {successmessage: 'Password successfully changed!'})
      }).catch(function(error) {
        return reply.view('reset-password', { errormessage: error.output.payload.message })
      })
    }
  },

  /**
   * Performs the delete user operation
   */
  delete: {
    handler: function(request, reply) {
      const user = request.auth.credentials

      return Core.users.delete(user).then(function(data) {
        request.cookieAuth.clear()
        return reply.view('signup', {successmessage : data.message})
      }).catch(function(error) {
        return reply.view('user/change-password', { errormessage: error.output.payload.message })
      })
    },
    auth: 'session'
  }
}

module.exports = Users
