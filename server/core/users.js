'use strict'

const _ = require('lodash')
const Boom = require('boom')
const when = require('when')
const validator = require('validator')
const User = require('../models/user')
const utils = require('./utils')
const nodemailer = require('nodemailer')
const path = require('path')
const htmlToText = require('html-to-text')
const fs = require('fs')
const config = require(path.join(__dirname, '..', 'config', 'settings'))
const templatesDir = path.resolve(__dirname, '..', 'email-templates')
const jsesc = require('jsesc')
let users

/**
 * User core functionality
 */
users = {
  /**
   * Forgot password
   *
   * @param       {user}   string: email address
   * @returns     {Promise(User)} found user respective given email
   */
  forgotPassword: function (user) {
    const that = this

    return utils.checkObject(user).then(function (data) {
      if (!validator.isEmail(data.email)) {
        return when.reject(Boom.badRequest('Email address invalid.'))
      }

      return that.findByEmail(data.email)
    }).then(function (user) {
      return user.generatePasswordResetToken().then(function (user) {
        return when.resolve(user)
      })
    }).then(function (user) {
      return user.save().then(function (doc) {
        return when.resolve(doc)
      })
    }).then(function (user) {
      // "promisify" the template loading callback
      return when.promise(function (resolve, reject, notify) {
        fs.readFile(templatesDir + '/' + 'reset-password.html', { encoding: 'utf8' }, function (err, fileContent) {
          if (err) {
            reject(Boom.badImplementation('Cannot read the email template content.'))
          }

          _.templateSettings.interpolate = /{{([\s\S]+?)}}/g

          const htmlContent = _.template(fileContent),            // generate site url from content
            siteUrl = config.baseUrl.replace(/\/$/, '') + '/reset-password/',            // insert user-specific data into the email
            compiledHtml = htmlContent({ resetToken: user.password_reset_token, siteUrl: siteUrl }),            // generate a plain-text version of the same email
            textContent = htmlToText.fromString(compiledHtml)

          resolve({
            html: compiledHtml,
            text: textContent
          })
        })
      })
    }).then(function (emailContent) {
      // "promisify" the template loading callback
      return when.promise(function (resolve, reject, notify) {
        const transporter = nodemailer.createTransport({
          service: config.email.service,
          auth: {
            user: config.email.auth.user,
            pass: config.email.auth.pass
          }
        })

        const mailOptions = {
          from: config.email.from,
          to: user.email,
          subject: 'Reset Password',
          text: emailContent.text,
          html: emailContent.html
        }

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            return reject(Boom.badImplementation('Mailer down! We cannot send your password. Sorry!'))
          } else {
            return resolve(user)
          }
        })
      })
    })
  },

  resetPassword: function (body) {
    return utils.checkObject(body).then(function (data) {
      if (_.isEmpty(data.reset_token)) {
        return when.reject(Boom.badRequest('Password reset token required.'))
      }

      if (_.isEmpty(data.new_password)) {
        return when.reject(Boom.badRequest('New password required.'))
      }

      if (_.isEmpty(data.confirm_new_password)) {
        return when.reject(Boom.badRequest('Confirm new password required.'))
      }

      if (!_.isEqual(data.new_password, data.confirm_new_password)) {
        return when.reject(Boom.badRequest('New password does not equal the confirmation password.'))
      }

      if (!validator.isLength(data.new_password, 6)) {
        return when.reject(Boom.badRequest('New password must be at least 6 characters.'))
      }

      return User.filter({ password_reset_token: data.reset_token }).run().then(function (foundUsers) {
        if (_.isEmpty(foundUsers)) {
          return when.reject(Boom.notFound('Wrong password request token.'))
        } else {
          const content = {
            user: _.first(foundUsers),
            new_password: data.new_password
          }

          return when.resolve(content)
        }
      })
    }).then(function (data) {
      const user = data.user
      user.password = data.new_password

      return user.generatePassword().then(function (user) {
        return when.resolve(user)
      })
    }).then(function (user) {
      if (user.password_reset_deadline < new Date()) {
        return when.reject(Boom.badRequest('The password reset token is expired. Please request a new one.'))
      }

      return when.resolve(user)
    }).then(function (user) {
      user.password_reset_token = undefined
      user.password_reset_deadline = undefined

      return user.save().then(function (doc) {
        return when.resolve(doc)
      })
    }).catch(function (error) {
      return when.reject(error)
    })
  }
}

module.exports = users
