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
        user = new User({
            email: 'test@futurestud.io'
        });
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
            assert.notEqual(user, result);
            done();
        }).catch(function(error) {
            done(error);
        });
    });
});
