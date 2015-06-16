// # IsAdmin Helper
// Usage: `{{#isAdmin}}`
// Checks whether the user has admin or owner rule
var _               = require('lodash'),
    isAdmin;

isAdmin = function (options) {
    options = options || {};

    var user = options.data.root.user;

    if (_.includes([user.role], 'owner', 'admin')) {
        return options.fn(this);
    }

    return options.inverse(this);
};

module.exports = isAdmin;
