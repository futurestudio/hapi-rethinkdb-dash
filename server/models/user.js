var thinky                  = require(__dirname + '/../utils/thinky'),
    r                       = thinky.r,
    bcrypt                  = require('bcrypt-as-promised'),
    when                    = require('when'),
    Boom                    = require('boom'),
    _                       = require('lodash'),
    SALT_WORK_FACTOR        = 10,
    User;


/**
 * Thinky user model
 */
User = thinky.createModel("User", {
    id: { _type: String, default: r.uuid()},
    username: String,
    name: String,
    url: String,
    email: String,
    email_verification: {_type: String, default: r.uuid()},
    password: String,
    password_reset_token: String,
    password_reset_deadline: Date,
    auth_token: { _type: String, default: r.uuid()},
    auth_token_issued: {_type: Date, default: r.now()},
    created_at: {_type: Date, default: r.now()},
    updated_at: {_type: Date, default: r.now()},
    role: { _type: String, default: 'User'} // should only be ('owner', 'admin', 'editor', 'user')
});

/**
 * Add method "comparePassword" to user model
 *
 * This method checks whether the provided candidate password matches the
 * user password
 */
User._methods.comparePassword = function(candidatePassword) {
    var user = this;

    return bcrypt.compare(candidatePassword, user.password).then(function(isMatch) {
        return when.resolve(isMatch);
    }).catch(function(error) {
        return when.reject(Boom.badRequest('Password is wrong.'));
    });
};

/**
 * This method salts, hashes and saves the user password. Additionally, a new
 * auth_token gets generated
 */
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
        user.auth_token = r.uuid();
        user.auth_token_issued = r.now();

        return when.promise(function(resolve, reject, notify) {
            resolve(user);
        });
    }).catch(function(error) {
        return when.reject(error);
    });
};

/**
 * This method generates a password reset token and sets the token’s deadline to t + 1h
 */
User._methods.generatePasswordResetToken = function() {
    var user = this,
        date = new Date();

    return r.uuid().then(function(uuid) {
        user.password_reset_token = uuid;
        user.password_reset_deadline = new Date(date.setHours(date.getHours() + 1));

        return when.resolve(user);
    });
};

/**
 * This method generates a new auth token
 */
User._methods.generateAuthToken = function() {
    this.auth_token = r.uuid();
    this.auth_token_issued = r.now();
    return when.resolve(this);
};

User._methods.hasRole = function(roleName) {
    return this.role === roleName;
};

module.exports = User;
