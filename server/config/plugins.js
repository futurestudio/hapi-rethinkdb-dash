'use strict'

// options to pass into the 'good' logging plugin
const GoodOptions = {
  ops: {
    interval: 10000
  },
  reporters: {
    console: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [ { log: '*', response: '*', request: '*' } ]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
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
