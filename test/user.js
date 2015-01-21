var assert              = require('assert'),
    config              = require('../server/config/database')('test'),
    thinky              = require('thinky')(config),
    r                   = thinky.r,
    api                 = require('../server/api'),
    User                = require('../server/models/user');


var tableName = 'User';

var cleanTables = function(done) {
    r.table(tableName).delete().run();
    thinky._clean();
    done();
};

describe('User API methods: CRUD', function() {
    var user;
    after(cleanTables);

    before(function() {
        user = {
            email: 'test@futurestud.io',
            password: 'testpassword'
        };
    });

    it('Create new user', function(done) {
        api.users.create(user).then(function(result) {
            assert(result);
            assert(result.id);
            assert(result.email);
            assert(result.created_at);
            assert(result.updated_at);
            assert(result.email_verification);
            done();
            user = result;
        }).catch(function(error) {
            done(error);
        });
    });

    it('Should not create a second user with the same email address', function(done) {
        api.users.create(user).then(function(result) {
            assert(result);
            assert(result.output);
            assert(result.output.statusCode);
            assert.equal(result.output.statusCode, 400);
            done();
        }).catch(function(error) {
            done(error);
        });
    });

    it('Should not create user without email', function(done) {
        var u = {
            password: 'testpassword'
        };

        api.users.create(u).then(function(result) {
            assert(result);
            assert(result.output);
            assert(result.output.statusCode);
            assert.equal(result.output.statusCode, 400);
            done();
        }).catch(function(error) {
            done(error);
        });
    });

    it('Should not create user without password', function(done) {
        var u = {
            email: 'userwithoutpassword@futurestud.io'
        };

        api.users.create(u).then(function(result) {
            assert(result);
            assert(result.output);
            assert(result.output.statusCode);
            assert.equal(result.output.statusCode, 400);
            done();
        }).catch(function(error) {
            done(error);
        });
    });

    it('Should update user data', function(done) {
        var data = {
            name: 'Test Name',
            url: 'furz.com'
        };

        api.users.update(user, data).then(function(result) {
            assert(result);
            assert(result.name);
            assert(result.url);
            done();
        }).catch(function(error) {
            done(error);
        });
    });

    it('Should not update user data: url is wrong', function(done) {
        var data = {
            url: '123'
        };

        api.users.update(user, data).then(function(result) {
            done();
        }).catch(function(error) {
            assert(error);
            done();
        });
    });

    it('Should not change password: old password wrong', function(done) {
        var data = {
            old_password: 'wrongpassword',
            new_password: 'doesntmatter',
            confirm_new_password: 'doesntmatter'
        };

        api.users.changePassword(user, data).then(function(result) {
            done();
        }).catch(function(error) {
            assert(error);
            done();
        });
    });

    it('Should not change password: confirm is different to new', function(done) {
        var data = {
            old_password: 'wrongpassword',
            new_password: 'doesntmatter',
            confirm_new_password: 'doesntmatter2'
        };

        api.users.changePassword(user, data).then(function(result) {
            done();
        }).catch(function(error) {
            assert(error);
            done();
        });
    });

    it('Should not change password: new too short', function(done) {
        var data = {
            old_password: 'testpassword',
            new_password: 'short',
            confirm_new_password: 'short'
        };

        api.users.changePassword(user, data).then(function(result) {
            done();
        }).catch(function(error) {
            assert(error);
            done();
        });
    });

    it('Should change the password', function(done) {
        var data = {
            old_password: 'testpassword',
            new_password: 'testpw',
            confirm_new_password: 'testpw'
        };

        api.users.changePassword(user, data).then(function(result) {
            assert(result);
            done();
        }).catch(function(error) {
            done(error);
        });
    });
});
