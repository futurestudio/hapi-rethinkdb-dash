var dbconfig    = require(__dirname + '/../config/database')(process.env.NODE_ENV || 'local'),
    thinky      = require('thinky')(dbconfig),
    r           = thinky.r,
    User;

User = thinky.createModel("User", {
    id: { _type: String, default: r.uuid()},
    first_name: String,
    last_name: String,
    full_name: {
        _type: "virtual",
        default: function() {
            return this.firstName + " " + this.lastName;
        }
    },
    email: String,
    email_verification: {_type: String, default: r.uuid()},
    password: String,
    password_reset_token: String,
    password_reset_deadline: Date,
    auth_token: String,
    auth_token_issued: Date,
    created_at: {_type: Date, default: r.now()},
    updated_at: {_type: Date, default: r.now()},
});

module.exports = User;
