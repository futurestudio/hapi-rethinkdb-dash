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
});
