var path                = require('path'),
    views               = path.join(__dirname, '..', '..', 'public', 'views');

/**
 * Default configuration for hapi server and various boilerplate options
 */
module.exports = {
    port: parseInt(process.env.PORT, 10) || 3000,
    hapi: {
        options: {
            views: {
                engines: {
                    html: require('handlebars')
                },
                path: views,
                layoutPath: views + '/layout',
                layout: 'default',
                // helpersPath: views + '/helpers',
                partialsPath: views + '/partials'
            }
        }
    }
};
