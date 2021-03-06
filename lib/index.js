const packageInfo = require('./../package.json');
const fetch = require('node-fetch');
const BandwidthErrors = require('./BandwidthErrors.js')

function Client(config) {

  if (!config.apiToken || !config.apiSecret || !config.accountId) {
    throw new BandwidthErrors.InvalidCredentialsError();
  }
  // Apply default values if not provided
  if (!config.baseUrl) {
    config.baseUrl = 'https://messaging.bandwidth.com/api/v2';
  }

  const baseUrl = `${config.baseUrl}/users/${config.accountId}/messages`;
  const username = config.apiToken;
  const password = config.apiSecret;
  const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
  const userAgent = `${packageInfo.name}:v${packageInfo.version}`;

  const parseJson = async res => {
    try {
      const json = await res.json();
      return {
        valid: true,
        body: json,
      }
    }
    catch (e) {
     if (e.type === 'invalid-json') {
        return {
          valid: false,
          body: res
        }
      }
      else {
        throw e;
      }
    }
  }

  const findError = res => {
    const status = res.status;
    switch (status) {
      case 400:
        return new BandwidthErrors.BadRequestError(status);
      case 401:
        return new BandwidthErrors.UnauthorizedError(status);
      case 403:
        return new BandwidthErrors.ForbiddenError(status);
      case 415:
        return new BandwidthErrors.UnsupportedContentTypeError(status);
      case 429:
        return new BandwidthErrors.RateLimitError(status);
      default:
        return new BandwidthErrors.UnexpectedResponseError(status);
    }
  }

  const parseResponse = async res => {
    const json = await parseJson(res);
    if (res.ok && json.valid){
      return json.body;
    }
    else {
      const error = findError(res);
      error.validJson = json.valid;
      error.response = json.body;
      throw error;
    }
  };

  const sendRequestToBandwidth = async message => {
    const res = await fetch(baseUrl, {
      method  : 'post',
      body    : JSON.stringify(message),
      headers : {
        'Content-Type'  : 'application/json',
        'Accept'        : 'application/json',
        'User-Agent'    : userAgent,
        'Authorization' : auth,
       },
    });
    const response = await parseResponse(res);
    return response;
  };

  this.sendMessage = message => {
    return sendRequestToBandwidth(message);
  };

};

module.exports.Client = Client;

module.exports.buildToArray = message => {
  let toNumbers = message.message.to;
  let index = toNumbers.indexOf(message.to);
  if (index > -1 ) {
    toNumbers.splice(index, 1);
  }
  toNumbers.push(message.message.from);
  return toNumbers;
};

for(var key in BandwidthErrors) {
  module.exports[key] = BandwidthErrors[key];
}