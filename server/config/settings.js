var path        = require('path');

// defaults that you can access when you require this config.
module.exports = {
    port: parseInt(process.env.PORT, 10) || 3000,
    hapi: {
        options: {
            views: {
                path: path.join(__dirname, '..', '..', 'public', 'views'),
                engines: { html: require('handlebars') }
            }
        }
    }
};
