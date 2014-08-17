module.exports = function (env) {
    if (env === 'prod' || env === 'production') {
        return {
            host: "localhost",
            port: 28015,
            authKey: "",
            db: "hapi_rethinkdb_boilerplate"
        };
    }
    else if (env === 'dev' || env === 'development') {
        return {
            host: "localhost",
            port: 28015,
            authKey: "",
            db: "hapi_rethinkdb_boilerplate"
        };
    }
};
