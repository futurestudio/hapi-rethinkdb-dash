var _                   = require('lodash'),
    Boom                = require('boom'),
    when                = require('when'),
    validator           = require('validator'),
    User                = require('../models/user'),
    utils               = require('./utils'),
    that                = this,
    users;


/**
*
*/
users = {
    /**
    *
    */
    find: function() {
        return User.run().then(function (users) {
            if (users) {
                return when.resolve(users);
            }

            return Boom.notFound('No users found');
        }).error(function(error) {
            return Boom.badImplementation('An error occured while reading user data');
        });
    },

    /**
    *
    * @returns User
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
    * @returns User
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
    * Find user by email
    *
    * @returns User
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
     * @returns User
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
     * @returns User
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
     * @returns User
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
     * @returns
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
     * @returns
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
                console.log(doc);
                return when.resolve({ message: 'Your account has been deleted from our database.', user: doc});
            });
        }).catch(function(error) {
            return when.reject(error);
        });
    }
};

module.exports = users;
