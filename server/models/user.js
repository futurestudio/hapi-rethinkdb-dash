'use strict'

const _ = require('lodash')
const Boom = require('boom')
const when = require('when')
const bcrypt = require('bcrypt')

const thinky = require(__dirname + '/../utils/thinky')
const r = thinky.r
const type = thinky.type
const SALT_WORK_FACTOR = 10
let User

/**
 * Thinky user model
 */
User = thinky.createModel('User', {
  id: type.string().default(r.uuid()),
  username: type.string(),
  name: type.string(),
  url: type.string(),
  email: type.string(),
  email_verification: type.string().default(r.uuid()),
  password: type.string(),
  password_reset_token: type.string(),
  password_reset_deadline: type.date(),
  auth_token: type.string().default(r.uuid()),
  auth_token_issued: type.date().default(r.now()),
  created_at: type.date().default(r.now()),
  updated_at: type.date().default(r.now()),
  scope: type.array() // ['admin', 'user'],
})

/**
 * Add method "comparePassword" to user model
 *
 * This method checks whether the provided candidate password matches the
 * user password
 */
User.define('comparePassword', function (candidatePassword) {
  const self = this

  return when.promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, self.password, function (err, isMatch) {
      if (isMatch) {
        return resolve(self)
      }
      return reject(Boom.badRequest('The entered password is not correct.'))
    })
  })
})

/**
 * This method salts, hashes and saves the user password. Additionally, a new
 * auth_token gets generated
 */
User.define('generatePassword', function () {
  const self = this

  return when.promise(function (resolve, reject) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) {
        return reject(Boom.badRequest('There was an error while hashing your password'))
      }
      bcrypt.hash(self.password, salt, function (err, hash) {
        if (err) {
          return reject(Boom.badRequest('There was an error while hashing your password'))
        }

        self.password = hash
        return resolve(self)
      })
    })
  })
})

/**
 * This method generates a password reset token and sets the token’s deadline to t + 1h
 */
User.define('generatePasswordResetToken', function () {
  const user = this
  const date = new Date()

  return r.uuid().then(function (uuid) {
    user.password_reset_token = uuid
    user.password_reset_deadline = new Date(date.setHours(date.getHours() + 1))

    return when.resolve(user)
  })
})

/**
 * This method generates a new auth token
 */
User.define('generateAuthToken', function () {
  const self = this

  return r.uuid().then(function (id) {
    self.auth_token = id
    return when.resolve(self)
  }).then(function (user) {
    return r.now().then(function (datetime) {
      user.auth_token_issued = datetime
      return when.resolve(user)
    })
  })
})

/**++++++++++++++++++++++++++++++*
 * Static Model Methods
 **++++++++++++++++++++++++++++++*/

User.defineStatic('findById', function findById (id) {
  if (_.isEmpty(id)) {
    return when.reject(Boom.badRequest('User id missing.'))
  }

  return this.get(id).run().then(function (user) {
    if (user) {
      return when.resolve(user)
    }

    return when.reject(Boom.notFound('No user registered with provided credentials.'))
  })
})

User.defineStatic('findByEmail', function findByEmail (email) {
  return this.filter({ email: email }).run().then(function (users) {
    return when.resolve(_.first(users))
  })
})

module.exports = User
