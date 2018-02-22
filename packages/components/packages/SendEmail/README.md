# Send Email

## Configuration

In order to configure this component, simply edit the `mailer` section in the `src/config.js` file to your preferred transport method.

The component is currently configured to use AWS SES:

```js
// src/config.js
const AWS = require('aws-sdk')

module.exports = {
  mailer: {
    from: process.env.EMAIL_SENDER,
    transport: {
      SES: new AWS.SES({
        accessKeyId: process.env.AWS_SES_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SES_SECRET_KEY,
        region: process.env.AWS_SES_REGION,
      }),
    },
  },
}
```

The `.env` file should contain the following data:

```bash
AWS_SES_SECRET_KEY = <secretKey>
AWS_SES_ACCESS_KEY = <accessKey>
EMAIL_SENDER = verified_ses_sender@domain.com
AWS_SES_REGION = region-name
```

## Usage

Here's an example on how you can use the component in your code.

```js
const Email = require('@pubsweet/component-send-email')

module.exports = {
  setupEmail: async toEmail => {
    const htmlBody = '<p>This is an email</p>'
    const textBody = 'This is an email'
    const subject = 'You have been invited!'

    Email.send(toEmail, subject, textBody, htmlBody)
  },
}
```
