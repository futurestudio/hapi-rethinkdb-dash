'use strict'

const Thinky = require('thinky')
const Config = require(__dirname + '/../config/database')(process.env.NODE_ENV || 'local');

// Initialize thinky based on db config
module.exports = Thinky(Config);
