module.exports = function (env) {
    if (env === 'prod' || env === 'production') {
        return {
            host: "localhost",
            port: 28015,
            authKey: "",
            db: "hapi-rethinkdb-boilerplate"
        };
    }
    else if (env === 'dev' || env === 'development') {
        return {
            host: "localhost",
            port: 28015,
            authKey: "",
            db: "hapi-rethinkdb-boilerplate"
        };
    }
};
