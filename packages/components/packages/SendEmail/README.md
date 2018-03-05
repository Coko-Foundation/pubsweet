# Send Email

## Configuration

In order to configure this component, simply add the path to your `mailer` configuration in your app's `config` file. For example:

```js
  mailer: {
    path: `${__dirname}/mailer`,
  },
```

In this case, `mailer.js` creates a new `AWS.SES` object which will be used to send emails:

```js
const AWS = require('aws-sdk')

module.exports = {
  from: process.env.EMAIL_SENDER,
  transport: {
    SES: new AWS.SES({
      accessKeyId: process.env.AWS_SES_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SES_SECRET_KEY,
      region: process.env.AWS_SES_REGION,
    }),
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

The `send-email` component contains a `send()` function which takes the following parameters: `toEmail`, `subject`, `textBody` and `htmlBody`.

```js
const Email = require('@pubsweet/component-send-email')

module.exports = {
  setupEmail: async toEmail => {
    const htmlBody = '<p>This is an email</p>'
    const textBody = 'This is an email'
    const subject = 'You have been invited!'

    try {
      const sendEmailRes = await Email.send(
        toEmail,
        subject,
        textBody,
        htmlBody,
      )
      return sendEmailRes
    } catch (e) {
      return e
    }
  },
}
```
