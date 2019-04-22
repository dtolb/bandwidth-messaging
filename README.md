# bandwidth-messaging
Personal Bandwidth Messaging SDK

## Sample Usage

```js
const Bandwidth = require('bandwidth-messaging');

const client = new Bandwidth.Client({
  accountId: '990099',
  apiToken: '1234-1234-1234-1234',
  apiSecret: '9874-9874-9874-9876',
})

try {
  const message = await client.sendMessage({
    to: '+15558675309',
    from: '+15552465703',
    text: 'Hey from Bandwidth',
    applicationId: '4321-4321-4321-4321'
  });
  console.log(message);
}
catch (e) {
  if (e instanceof Bandwidth.BadRequestError) {
    console.log('Error: 400 response code');
  }
  if (e instanceof Bandwidth.UnauthorizedError) {
    console.log('Error: 401 response code');
  }
  if (e instanceof Bandwidth.ForbiddenError) {
    console.log('Error: 403 response code');
  }
  if (e instanceof Bandwidth.UnsupportedContentTypeError) {
    console.log('Error: 415 response code');
  }
  if (e instanceof Bandwidth.RateLimitError) {
    console.log('Error: 429 response code');
  }
  if (e instanceof Bandwidth.UnexpectedResponseError) {
    console.log('Error: anything else');
  }
  console.log(e);
}
```
