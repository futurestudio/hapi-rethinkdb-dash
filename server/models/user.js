var dbconfig                = require(__dirname + '/../config/database')(process.env.NODE_ENV || 'local'),
    thinky                  = require('thinky')(dbconfig),
    r                       = thinky.r,
    bcrypt                  = require('bcrypt-as-promised'),
    Joi                     = require('joi'),
    when                    = require('when'),
    _                       = require('lodash'),
    Boom                    = require('boom'),
    SALT_WORK_FACTOR        = 10,
    Schema,
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

User.prototype.comparePassword = function(candidatePassword) {
    bcrypt.compare(candidatePassword, this.password).then(function(isMatch) {
        return isMatch;
    }).catch(function(error) {
        return error;
    });
};

User.prototype.generatePassword = function(password) {
    bcrypt.genSalt(SALT_WORK_FACTOR).then(function(salt) {
        bcrypt.hash(password, salt).then(function(hash) {
            this.password = hash;
            return next();
        }).catch(function(error) {
            console.log(error);
            return next(error);
        });
    }).catch(function(error) {
        console.log(error);
        return next(error);
    });
};

module.exports = User;
