'use strict'

const _ = require('lodash')

// options to pass into the 'good' logging plugin
const reporterOptions = {
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

const reporters = (_.isEqual(process.env.NODE_ENV, 'test')) ? {} : reporterOptions

const GoodOptions = {
  ops: {
    interval: 10000
  },
  reporters: reporters
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
