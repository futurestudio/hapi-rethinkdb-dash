var _                   = require('lodash'),
    Boom                = require('boom'),
    when                = require('when'),
    validator           = require('validator'),
    User                = require('../models/user'),
    utils               = require('./utils'),
    nodemailer          = require('nodemailer'),
    path                = require('path'),
    htmlToText          = require('html-to-text'),
    fs                  = require('fs'),
    config              = require(path.join(__dirname, '..', 'config', 'settings')),
    templatesDir        = path.resolve(__dirname, '..', 'email-templates'),
    users;


/**
 * User core functionality
 */
users = {
    /**
     * Returns all users from database
     *
     * @returns     [{Promise(User)}] Users
     */
    find: function() {
        return User.run().then(function (users) {
            if (users) {
                return when.resolve(users);
            }

            return Boom.notFound('No users found');
        }).error(function(error) {
            return when.reject(Boom.badImplementation('An error occured while reading user data'));
        });
    },

    /**
     * Find user by id
     *
     * @param       {id} user id
     * @returns     {Promise(User)} User
     */
    findById: function(id) {
        if (_.isEmpty(id)) {
            return when.reject(Boom.badRequest('User id missing.'));
        }

        return User.get(id).run().then(function (user) {
            if (user) {
                return when.resolve(user);
            }

            return when.reject(Boom.notFound('No user registered with provided credentials.'));
        }).error(function(error) {
            return when.reject(error);
        });
    },

    /**
     * Find user by email
     *
     * @param       {email} user email
     * @returns     {Promise(User)} User
     */
    findByEmail: function(email) {
        if (_.isEmpty(email)) {
            return when.reject(Boom.badRequest('Email missing.'));
        }

        if ( ! validator.isEmail(email)) {
            return when.reject(Boom.badRequest('Email address required.'));
        }

        return User.filter({email: email}).run().then(function (users) {
            if (_.isEmpty(users)) {
                return when.reject(Boom.notFound('No user registered with provided credentials.'));
            }

            return when.resolve(_.first(users));
        }).error(function(error) {
            return when.reject(error);
        });
    },

    /**
     * Find user by auth token
     *
     * @param       {token} authentication token
     * @returns     {Promise(User)} User
     */
    findByAuthToken: function(token) {
        if (_.isEmpty(token)) {
            return when.reject(Boom.badRequest('Token missing.'));
        }

        return User.filter({auth_token: token}).run().then(function (users) {
            if (_.isEmpty(users)) {
                return when.reject(Boom.notFound('No user registered with provided credentials.'));
            }

            return when.resolve(_.first(users));
        }).error(function(error) {
            return when.reject(error);
        });
    },

    /**
     * Login user: requires email and password in the object body.
     *
     * @param       {body} user email and password
     * @returns     {Promise(User)} User
     */
    login: function(body) {
        var that = this;

        return utils.checkObject(body).then(function(userdata) {
            if ( ! validator.isEmail(userdata.email)) {
                return when.reject(Boom.badRequest('Email address missing.'));
            }

            if ( ! validator.isLength(userdata.password, 6)) {
                return when.reject(Boom.badRequest('Password missing.'));
            }

            return that.findByEmail(userdata.email);
        }).then(function(user) {
            return user.comparePassword(body.password).then(function(isMatch) {
                if (isMatch) {
                    return when.resolve(user);
                } else {
                    return when.reject('Password not correct.');
                }
            });
        }).catch(function (error) {
            return when.reject(error);
        });
    },

    /**
     * Create user
     *
     * @param       {object} user data
     * @returns     {Promise(User)} created User
     */
    create: function(object) {
        var user;

        return utils.checkObject(object).then(function(userdata) {
            if ( ! validator.isEmail(userdata.email)) {
                return when.reject(Boom.badRequest('Email address missing.'));
            }

            if ( ! validator.isLength(userdata.password, 6)) {
                return when.reject(Boom.badRequest('Password must be at least 6 characters.'));
            }

            user = new User(userdata);

            return user.generatePassword().then(function(user) {
                return when.resolve(user);
            }).then(function(user) {
                return User.filter({email: user.email}).run().then(function(foundUsers) {
                    return when.resolve(foundUsers);
                });
            }).then(function(users) {
                if (_.isEmpty(users)) {
                    return user.save().then(function(doc) {
                        return when.resolve(doc);
                    });
                } else {
                    return when.reject(Boom.conflict('E-Mail address is already registered.'));
                }
            });
        }).catch(function (error) {
            return when.reject(error);
        });
    },

    /**
     * Update user
     *
     * @param       {user, body} user, request body
     * @returns     {Promise(User)} updated User
     */
    update: function(user, body) {
        return utils.checkObject(body).then(function(newData) {
            return User.filter({email: user.email}).run().then(function(foundUsers) {
                if (_.isEmpty(foundUsers)) {
                    return when.reject(Boom.notFound('User not found.'));
                } else {
                    return when.resolve(_.first(foundUsers));
                }
            });
        }).then(function(user) {
            if ( ! _.isEqual(user.email, body.email) && validator.isEmail(body.email)) {
                user.email = body.email;
            }

            if ( ! _.isEqual(user.name, body.name)) {
                user.name = body.name;
            }

            if ( ! _.isEqual(user.url, body.url)) {
                user.url = body.url;
            }

            return user.save().then(function(doc) {
                return when.resolve(doc);
            });
        }).catch(function(error) {
            return when.reject(error);
        });
    },

    /**
     * Change user password
     *
     * @param       {user, body} user, request body
     * @returns     {Promise(User)} User
     */
    changePassword: function(user, body) {
        return utils.checkObject(body).then(function(data) {
            if (_.isEmpty(data.old_password)) {
                return when.reject(Boom.badRequest('Old password required.'));
            }

            if (_.isEmpty(data.new_password)) {
                return when.reject(Boom.badRequest('New password required.'));
            }

            if (_.isEmpty(data.confirm_new_password)) {
                return when.reject(Boom.badRequest('Confirm new password required.'));
            }

            if ( ! _.isEqual(data.new_password, data.confirm_new_password)) {
                return when.reject(Boom.badRequest('New password does not equal the confirmation password.'));
            }

            if ( ! validator.isLength(data.new_password, 6)) {
                return when.reject(Boom.badRequest('New password must be at least 6 characters.'));
            }

            return User.filter({email: user.email}).run().then(function(foundUsers) {
                if (_.isEmpty(foundUsers)) {
                    return when.reject(Boom.notFound('No user found with given credentials.'));
                } else {
                    return when.resolve(_.first(foundUsers));
                }
            });
        }).then(function(user) {
            return user.comparePassword(body.old_password).then(function(isMatch) {
                if (isMatch) {
                    user.password = body.new_password;

                    return user.generatePassword().then(function(user) {
                        return when.resolve(user);
                    });
                } else {
                    return when.reject(Boom.badRequest('Old password is wrong.'));
                }
            });
        }).then(function(user) {
            return user.generateAuthToken().then(function(user) {
                return when.resolve(user);
            });
        }).then(function(user) {
            return user.save().then(function(doc) {
                return when.resolve(doc);
            });
        }).catch(function(error) {
            return when.reject(error);
        });
    },

    /**
     * Forgot password
     *
     * @param       {user}   string: email address
     * @returns     {Promise(User)} found user respective given email
     */
    forgotPassword: function(user) {
        var that = this;

        return utils.checkObject(user).then(function(data) {
            if ( ! validator.isEmail(data.email)) {
                return when.reject(Boom.badRequest('Email address invalid.'));
            }

            return that.findByEmail(data.email);
        }).then(function(user) {
            return user.generatePasswordResetToken().then(function (user) {
                return when.resolve(user);
            });
        }).then(function(user) {
            return user.save().then(function (doc) {
                return when.resolve(doc);
            });
        }).then(function(user) {
            // "promisify" the template loading callback
            return when.promise(function(resolve, reject, notify) {
                fs.readFile(templatesDir + '/' + 'reset-password.html', {encoding: 'utf8'}, function (err, fileContent) {
                    if (err) {
                        reject(Boom.badImplementation('Cannot read the email template content.'));
                    }

                    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

                    var htmlContent = _.template(fileContent),
                        // generate site url from content
                        siteUrl = config.baseUrl.replace(/\/$/, '') + '/reset-password/',
                        // insert user-specific data into the email
                        compiledHtml = htmlContent({resetToken: user.password_reset_token, siteUrl: siteUrl}),
                        // generate a plain-text version of the same email
                        textContent = htmlToText.fromString(compiledHtml);

                    resolve({
                        html: compiledHtml,
                        text: textContent
                    });
                });
            });
        }).then(function(emailContent) {
            // "promisify" the template loading callback
            return when.promise(function(resolve, reject, notify) {
                var transporter = nodemailer.createTransport({
                    service: config.email.service,
                        auth: {
                            user: config.email.auth.user,
                            pass: config.email.auth.pass
                        }
                    });

                var mailOptions = {
                    from: config.email.from,
                    to: user.email,
                    subject: 'Reset Password',
                    text: emailContent.text,
                    html: emailContent.html
                };

                transporter.sendMail(mailOptions, function(err, info) {
                    if (err) {
                        return reject(Boom.badImplementation('Mailer down! We cannot send your password. Sorry!'));
                    } else {
                        return resolve(user);
                    }
                });
            });
        }).catch(function(error) {
            return when.reject(error);
        });
    },

    resetPassword: function(body) {
        return utils.checkObject(body).then(function(data) {
            if (_.isEmpty(data.reset_token)) {
                return when.reject(Boom.badRequest('Password reset token required.'));
            }

            if (_.isEmpty(data.new_password)) {
                return when.reject(Boom.badRequest('New password required.'));
            }

            if (_.isEmpty(data.confirm_new_password)) {
                return when.reject(Boom.badRequest('Confirm new password required.'));
            }

            if ( ! _.isEqual(data.new_password, data.confirm_new_password)) {
                return when.reject(Boom.badRequest('New password does not equal the confirmation password.'));
            }

            if ( ! validator.isLength(data.new_password, 6)) {
                return when.reject(Boom.badRequest('New password must be at least 6 characters.'));
            }
            
            return User.filter({password_reset_token: data.reset_token}).run().then(function(foundUsers) {
                if (_.isEmpty(foundUsers)) {
                    return when.reject(Boom.notFound('Wrong password request token.'));
                } else {
                    var content = {
                        user: _.first(foundUsers),
                        new_password: data.new_password
                    };

                    return when.resolve(content);
                }
            });
        }).then(function(data) {
            var user = data.user;
            user.password = data.new_password;

            return user.generatePassword().then(function(user) {
                return when.resolve(user);
            });
        }).then(function(user) {
            if (user.password_reset_deadline < new Date()) {
                return when.reject(Boom.badRequest('The password reset token is expired. Please request a new one.'));
            }

            return when.resolve(user);
        }).then(function(user) {
            user.password_reset_token = undefined;
            user.password_reset_deadline = undefined;

            return user.save().then(function(doc) {
                return when.resolve(doc);
            });
        }).catch(function(error) {
            return when.reject(error);
        });
    },

    /**
     * Delete user
     *
     * @param       {user} user object
     * @returns     {Promise(User)} deleted user
     */
     delete: function(user) {
        return utils.checkObject(user).then(function(data) {
            return User.filter({email: data.email}).run().then(function(foundUsers) {
                if (_.isEmpty(foundUsers)) {
                    return when.reject(Boom.notFound('No user found with given credentials.'));
                } else {
                    return when.resolve(_.first(foundUsers));
                }
            });
        }).then(function(user) {
            return user.delete().then(function(doc) {
                return when.resolve({ message: 'Your account has been deleted from our database.', user: doc});
            });
        }).catch(function(error) {
            return when.reject(error);
        });
    }
};

module.exports = users;
