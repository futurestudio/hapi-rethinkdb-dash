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
    auth_token: { _type: String, default: r.uuid()},
    auth_token_issued: {_type: Date, default: r.now()},
    created_at: {_type: Date, default: r.now()},
    updated_at: {_type: Date, default: r.now()}
});

User.prototype.comparePassword = function(candidatePassword) {
    bcrypt.compare(candidatePassword, this.password).then(function(isMatch) {
        return isMatch;
    }).catch(function(error) {
        return error;
    });
};

User._methods.generatePassword = function() {
    var user = this;

    return bcrypt.genSalt(SALT_WORK_FACTOR).then(function(salt) {
        return bcrypt.hash(user.password, salt).then(function(hash) {
            user.password = hash;
            return when.promise(function(resolve, reject, notify) {
                resolve(user);
            });
        });
    }).then(function(user) {
        return bcrypt.genSalt(SALT_WORK_FACTOR).then(function(token) {
            user.auth_token = token;
            return when.promise(function(resolve, reject, notify) {
                resolve(user);
            });
        });
    }).catch(function(error) {
        console.log(error);
        return when.reject(error);
    });
};

module.exports = User;
