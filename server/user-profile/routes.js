'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/profile',
    config: Handler.profile
  },
  {
    method: 'POST',
    path: '/profile',
    config: Handler.update
  },
  {
    method: 'GET',
    path: '/profile/change-password',
    config: Handler.showChangePassword
  },
  {
    method: 'POST',
    path: '/profile/change-password',
    config: Handler.changePassword
  }
  // TODO implement this functionality
  // TODO pull requests are highly welcome :)

  // {
  //   method: 'GET',
  //   path: '/forgot-password',
  //   config: Handler.showForgotPassword
  // },
  // {
  //   method: 'POST',
  //   path: '/forgot-password',
  //   config: Handler.forgotPassword
  // },
  // {
  //   method: 'GET',
  //   path: '/reset-password/{resetToken}',
  //   config: Handler.showResetPassword
  // },
  // {
  //   method: 'POST',
  //   path: '/reset-password',
  //   config: Handler.resetPassword
  // }
]

module.exports = Routes
