var thinky = require('thinky'),
    config = require(__dirname + '/../config/database')(process.env.NODE_ENV || 'local');

// Initialize thinky based on db config
module.exports = thinky(config);
