var dbconfig    = require(__dirname + '/../config/database')(process.env.NODE_ENV || 'dev'),
    thinky      = require('thinky')(dbconfig),
    r           = thinky.r;

// Import rethinkdbdash
//var thinky = require('thinky')(config.rethinkdb);
var thinky = require('thinky')(dbconfig);


var User = thinky.createModel("User", {
    id: String,
    name: String,
    email: String,
    password: String,
    password_reset_token: String,
    password_reset_deadline: Date,
    auth_token: { type: String, unique: true },
    auth_token_issued: { type: Date },
    createdAt: {_type: Date, default: r.now()},
    editedAt: {_type: Date, default: r.now()},
});

module.exports = User;
