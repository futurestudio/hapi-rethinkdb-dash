'use strict'

const Handler = require('./handler')

const Routes = [
  {
    method: 'GET',
    path: '/login',
    config: Handler.showLogin
  },
  {
    method: 'POST',
    path: '/login',
    config: Handler.login
  },
  {
    method: 'GET',
    path: '/signup',
    config: Handler.showSignup
  },
  {
    method: 'POST',
    path: '/signup',
    config: Handler.signup
  },
  {
    method: 'GET',
    path: '/logout',
    config: Handler.logout
  }
]

module.exports = Routes
