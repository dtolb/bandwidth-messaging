const packageInfo = require('./../package.json');
const fetch = require('node-fetch');

function Client(config) {
  if (!config.apiToken || !config.apiSecret || !config.accountId) {
    throw new Error('Invalid or non-existing Bandwidth credentials. \nPlease set your: \n * accountId \n * apiToken \n * apiSecret');
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

  const sendRequestToBandwidth = async message => {
    const res = await fetch(baseUrl, {
      method: 'post',
      body:    JSON.stringify(message),
      headers: {
        'Content-Type'  : 'application/json',
        'Accept'        : 'application/json',
        'User-Agent'    : userAgent,
        'Authorization' : auth,
       },
    });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    else {
      const error = new Error();
      error.code = res.status
      try {
        error.message = await res.json();
      }
      catch (e) {
        error.message = res.statusText;
      }
      throw error;
    }

  };

  this.sendMessage = async message => {
    const outMessage = await sendRequestToBandwidth(message);
    return outMessage;
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