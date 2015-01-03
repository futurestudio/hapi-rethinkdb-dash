var path                = require('path'),
    views               = path.join(__dirname, '..', '..', 'public', 'views');

// defaults that you can access when you require this config.
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
                helpersPath: views + '/helpers',
                partialsPath: views
            }
        }
    }
};
