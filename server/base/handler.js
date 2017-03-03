'use strict'

let Handler

Handler = {
  index: {
    // auth: 'session',
    handler: function (request, reply) {
      reply.view('index')
    }
  },

  missing: {
    handler: function (request, reply) {
      return reply.view('404', {
        title: 'You found a missing page, but won the 404 error!'
      }).code(404)
    }
  },

  images: {
    handler: {
      directory: { path: './public/images' }
    }
  },

  css: {
    handler: {
      directory: { path: './public/css' }
    }
  },

  js: {
    handler: {
      directory: { path: './public/js' }
    }
  }
}

module.exports = Handler