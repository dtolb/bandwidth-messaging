const axios = require('axios');
const packageInfo = require('./../package.json');

const Client = (config) => {
  if (!config.apiToken || !config.apiSecret || !config.accountId) {
    throw new Error('Invalid or non-existing Bandwidth credentials. \nPlease set your: \n * accountId \n * apiToken \n * apiSecret');
  }
  // Apply default values if not provided
  if (!config.baseUrl) {
    config.baseUrl = 'https://messaging.bandwidth.com/api/v2';
  }

  const getUserAgentHeader = () => {
    return packageInfo.name + "-v" + packageInfo.version;
  };

  const messageV2API = axios.create({
    baseURL: `${baseUrl}/users/${accountId}/messages`,
    auth: {
      username: apiToken,
      password: apiSecret
    },
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'User-Agent' : getUserAgentHeader()
    }
  });

  this.sendMessage = async message => {
    const outMessage = await messageV2API.post('', message);
    return outMessage.data;
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