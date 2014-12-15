var _                           = require('lodash'),
NotFoundError                   = require('./not-found-error'),
BadRequestError                 = require('./bad-request-error'),
InternalServerError             = require('./internal-server-error'),
errors;


/**
* Basic error handling helpers
*/
errors = {
    
};

module.exports                            = errors;
module.exports.NotFoundError              = NotFoundError;
module.exports.BadRequestError            = BadRequestError;
module.exports.InternalServerError        = InternalServerError;
// module.exports.NoPermissionError          = NoPermissionError;
// module.exports.UnauthorizedError          = UnauthorizedError;
// module.exports.ValidationError            = ValidationError;
// module.exports.RequestEntityTooLargeError = RequestEntityTooLargeError;
// module.exports.UnsupportedMediaTypeError  = UnsupportedMediaTypeError;
// module.exports.EmailError                 = EmailError;
// module.exports.DataImportError            = DataImportError;
