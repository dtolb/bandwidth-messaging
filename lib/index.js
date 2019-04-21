const packageInfo = require('./../package.json');
const fetch = require('node-fetch');
const be = require('./BandwidthErrors.js')

function Client(config) {

  if (!config.apiToken || !config.apiSecret || !config.accountId) {
    throw new be.InvalidCredentialsError();
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

  const parseResponse = async res => {
    const status = res.status;
    const value = await res.json();
    if (res.ok){
      return value;
    }
    else {
      switch (status) {
        case 400:
          throw new be.BadRequestError(value, status);
        case 401:
          throw new be.UnauthorizedError(value, status);
        case 403:
          throw new be.ForbiddenError(value, status);
        case 415:
          throw new be.UnsupportedContentTypeError(value,status);
        case 429:
          throw new be.RateLimitError(value, status);
        default:
          throw new be.UnexpectedResponseError(value, status);
      }
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

  this.buildToArray = message => {
    let toNumbers = message.message.to;
    let index = toNumbers.indexOf(message.to);
    if (index > -1 ) {
      toNumbers.splice(index, 1);
    }
    toNumbers.push(message.message.from);
    return toNumbers;
  };

};

module.exports = Client;