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
                //helpersPath: views + '/helpers',
                partialsPath: views + '/partials'
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
};
