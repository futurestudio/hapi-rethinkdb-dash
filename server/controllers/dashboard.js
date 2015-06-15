var core                = require('../core'),
    _                   = require('lodash'),
    dashboard;


/**
* Dashboard controller:
*/
dashboard = {
    /**
    * Renderes dashboard view
    */
    showDashboard: {
        handler: function(request, reply) {
            return reply.view('dashboard/dashboard', {context: 'dashboard', user: request.auth.credentials});
        },
        auth: 'session'
    }
};

module.exports = dashboard;
