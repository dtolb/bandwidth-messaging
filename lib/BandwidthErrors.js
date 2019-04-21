'use strict';

module.exports.InvalidCredentialsError = class InvalidCredentialsError extends Error{
    constructor (){
      super();
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.message = `Invalid or non-existing Bandwidth credentials. See https://dev.bandwidth.com/v2-messaging/accountCredentials for more info`
    }
};

module.exports.BadRequestError = class BadRequestError extends Error{
    constructor (statusCode){
      super('Bad Request Error, learn more: https://dev.bandwidth.com/v2-messaging/errors/badRequest');
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.UnauthorizedError = class UnauthorizedError extends Error{
    constructor (statusCode){
      super('Unauthorized Error, learn more: https://dev.bandwidth.com/v2-messaging/errors/unauth');
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.ForbiddenError = class ForbiddenError extends Error{
    constructor (statusCode){
      super('Forbidden Error, learn more: https://dev.bandwidth.com/v2-messaging/errors/forbidden');
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.UnsupportedContentTypeError = class UnsupportedContentTypeError extends Error{
    constructor (statusCode){
      super('Unsupported Content Type Error, learn more: https://dev.bandwidth.com/v2-messaging/errors/unsupportedContentType');
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.RateLimitError = class RateLimitError extends Error{
    constructor (statusCode){
      super('Rate Limit Error, learn more: https://dev.bandwidth.com/v2-messaging/errors/tooManyReq \n See the MPS Guidelines: https://dev.bandwidth.com/v2-messaging/billingAndMpsGuidelines');
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.UnexpectedResponseError = class UnexpectedResponseError extends Error{
    constructor (statusCode){
      super('Unexpected Response from the Bandwidth API. Check the docs at: https://dev.bandwidth.com/v2-messaging .\n Contact support at: https://support.bandwidth.com');
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};