'use strict'

const Path = require('path');
const Views = Path.join(__dirname, '..', '..', 'public', 'views')
const Handlebars = require('handlebars')

/**
 * Default configuration for hapi server and various boilerplate options
 */
module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  hapi: {
    options: {
      views: {
        engines: {
          html: Handlebars
        },
        path: Views,
        layoutPath: Views + '/layout',
        layout: 'default',
        helpersPath: Views + '/helpers',
        partialsPath: Views + '/partials'
      }
    }
  },
  // We use Nodemailer to send emails. Check service options on http://www.nodemailer.com/
  email: {
    service: 'Mailgun',
    auth: {
      user: 'username',
      pass: 'password'
    },
    from: 'Dash Mailer ✔ <your@url.com>'
  },
  baseUrl: 'http://localhost:3000'
}
