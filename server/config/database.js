/**
 * Database configuration file. Specify the database name and connection details
 * for your RethinkDB instance
 */
module.exports = function (env) {
    if (env === 'prod' || env === 'production') {
        return {
            host: "localhost",
            port: 28015,
            authKey: "",
            db: "hapi_rethinkdb_boilerplate",
            silent: true
        };
    }
    else if (env === 'dev' || env === 'development') {
        return {
            host: "localhost",
            port: 28015,
            authKey: "",
            db: "hapi_rethinkdb_boilerplate",
            silent: true
        };
    }
    else if (env === 'test') {
        return {
            host: "localhost",
            port: 28015,
            authKey: "",
            db: "hapi_rethinkdb_boilerplate_test",
            silent: true
        };
    }
    else if (env === 'local' ) {
        return {
            host: "localhost",
            port: 28015,
            authKey: "",
            db: "hapi_rethinkdb_boilerplate",
            silent: true
        };
    }
};
