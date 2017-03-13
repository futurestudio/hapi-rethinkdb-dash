'use strict'

const Lab = require('lab')
const Code = require('code')

const Hapi = require('hapi')
const server = new Hapi.Server();
server.connection({ port: 3000 });

const Plugins = require('../server/config/plugins')
const Config = require('../server/config/database')('test')
const thinky = require('thinky')(Config)
const r = thinky.r
const Core = require('../server/core')
const User = require('../server/models/').User

const lab = exports.lab = Lab.script()
const experiment = lab.experiment
const test = lab.test
const before = lab.before
const after = lab.after

experiment('User methods:', function () {
  before(function (done) {
    server.register(Plugins, function (err) {
      if (err) {
        console.log(err)
        throw err
      }

      done()
    })
  })

  after(function (done) {
    r.table('User').delete().run()
    thinky._clean()
    done()
  })

  test('test user create', function (done) {
    const options = {
      url: '/signup',
      method: 'POST',
      payload: {
        email: 'test@user.com',
        password: 'password'
      }
    }

    server.inject(options, (response) => {

      done()
    })
  })

  // test('Should not create a second user with the same email address', function (done) {
  //   Core.users.create(user).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should not create user without email', function (done) {
  //   const u = {
  //     password: 'testpassword'
  //   }
  //
  //   Core.users.create(u).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should not create user without password', function (done) {
  //   var u = {
  //     email: 'userwithoutpassword@futurestud.io'
  //   }
  //
  //   Core.users.create(u).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should update user data', function (done) {
  //   var data = {
  //     name: 'Test Name',
  //     url: 'example.com'
  //   }
  //
  //   Core.users.update(user, data).then(function (result) {
  //     Code.expect(result).to.be.an.object()
  //     // assert(result)
  //     // assert(result.name)
  //     // assert(result.url)
  //     done()
  //   }).catch(function (error) {
  //     done(error)
  //   })
  // })
  //
  // test('Should not update user data: url is wrong', function (done) {
  //   var data = {
  //     url: '123'
  //   }
  //
  //   Core.users.update(user, data).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should not change password: old password wrong', function (done) {
  //   var data = {
  //     old_password: 'wrongpassword',
  //     new_password: 'doesntmatter',
  //     confirm_new_password: 'doesntmatter'
  //   }
  //
  //   Core.users.changePassword(user, data).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should not change password: confirm is different to new', function (done) {
  //   var data = {
  //     old_password: 'wrongpassword',
  //     new_password: 'doesntmatter',
  //     confirm_new_password: 'doesntmatter2'
  //   }
  //
  //   Core.users.changePassword(user, data).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should not change password: new too short', function (done) {
  //   var data = {
  //     old_password: 'testpassword',
  //     new_password: 'short',
  //     confirm_new_password: 'short'
  //   }
  //
  //   Core.users.changePassword(user, data).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should change the password', function (done) {
  //   var data = {
  //     old_password: 'testpassword',
  //     new_password: 'testpw',
  //     confirm_new_password: 'testpw'
  //   }
  //
  //   Core.users.changePassword(user, data).then(function (result) {
  //     Code.expect(result).to.be.an.object()
  //     done()
  //   }).catch(function (error) {
  //     done(error)
  //   })
  // })
  //
  // test('Should reset users password', function (done) {
  //   var data = {
  //     new_password: 'newpassword',
  //     confirm_new_password: 'newpassword',
  //     reset_token: user.password_reset_token
  //   }
  //
  //   Core.users.resetPassword(data).then(function (result) {
  //     Code.expect(result).to.be.an.object()
  //     // assert(result)
  //     // assert(result.password)
  //     // assert.equal(result.password_reset_token, undefined)
  //     // assert.equal(result.password_reset_deadline, undefined)
  //     done()
  //   }).catch(function (error) {
  //     done(error)
  //   })
  // })
  //
  // test('Should not reset users password: wrong reset token', function (done) {
  //   var data = {
  //     new_password: 'newpassword',
  //     confirm_new_password: 'newpassword',
  //     reset_token: 'wrongResetToken'
  //   }
  //
  //   Core.users.resetPassword(data).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should not reset users password: passwords don’t match', function (done) {
  //   var data = {
  //     new_password: 'newpassword',
  //     confirm_new_password: 'anothernewpassword',
  //     reset_token: user.password_reset_token
  //   }
  //
  //   Core.users.resetPassword(data).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should not reset users password: reset token missing', function (done) {
  //   var data = {
  //     new_password: 'newpassword',
  //     confirm_new_password: 'newpassword'
  //   }
  //
  //   Core.users.resetPassword(data).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should not reset users password: new password missing', function (done) {
  //   var data = {
  //     confirm_new_password: 'newpassword',
  //     reset_token: user.password_reset_token
  //   }
  //
  //   Core.users.resetPassword(data).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
  //
  // test('Should not reset users password: confirm password token missing', function (done) {
  //   var data = {
  //     new_password: 'newpassword',
  //     reset_token: user.password_reset_token
  //   }
  //
  //   Core.users.resetPassword(data).then(function (result) {
  //     Code.expect(result).to.be.null()
  //     done()
  //   }).catch(function (error) {
  //     Code.expect(error).to.be.an.object()
  //     done()
  //   })
  // })
})
