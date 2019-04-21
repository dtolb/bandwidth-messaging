'use strict';

module.exports.InvalidCredentialsError = class InvalidCredentialsError extends Error{
    constructor (){
      super();
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.message = `Invalid or non-existing Bandwidth credentials.
      Please set your:
        * accountId
        * apiToken
        * apiSecret`;
    }
};

module.exports.BadRequestError = class BadRequestError extends Error{
    constructor (message, statusCode){
      super(message);
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.message = message;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.UnauthorizedError = class UnauthorizedError extends Error{
    constructor (message, statusCode){
      super(message);
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.message = message;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.ForbiddenError = class ForbiddenError extends Error{
    constructor (message, statusCode){
      super(message);
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.message = message;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.UnsupportedContentTypeError = class UnsupportedContentTypeError extends Error{
    constructor (message, statusCode){
      super(message);
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.message = message;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.RateLimitError = class RateLimitError extends Error{
    constructor (message, statusCode){
      super(message);
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.message = message;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};

module.exports.UnexpectedResponseError = class UnexpectedResponseError extends Error{
    constructor (message, statusCode){
      super(message);
      this.name = this.constructor.name;
      this.type = this.constructor.name;
      this.message = message;
      this.statusCode = statusCode;
      this.code = statusCode;
    }
};