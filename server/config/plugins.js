'use strict'

// options to pass into the 'good' logging plugin
const GoodOptions = {
  reporters: [ {
    reporter: require('good-console'),
    events: { log: '*', request: '*', response: '*' }
  } ]
}

const Plugins = [
  {
    register: require('good'),
    options: GoodOptions
  },
  {
    register: require('hapi-auth-cookie')
  },
  {
    register: require('vision')
  },
  {
    register: require('inert')
  },
  {
    register: require('./../authentication')
  },
  {
    register: require('./../base')
  },
  {
    register: require('./../user-login-signup')
  },
  {
    register: require('./../user-profile')
  }
]

module.exports = Plugins
