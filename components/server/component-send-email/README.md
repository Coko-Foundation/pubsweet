# Send Email

## Configuration

In order to configure this component, simply add the path to your `mailer` configuration in your app's `config` file. For example:

```js static
  mailer: {
    path: `${__dirname}/mailer`,
  },
```

In this case, `mailer.js` creates a new `AWS.SES` object which will be used to send emails:

```js static
const AWS = require('aws-sdk')
const config = require('config')

module.exports = {
  transport: {
    SES: new AWS.SES({
      accessKeyId: config.SES.accessKey,
      secretAccessKey: config.SES.secretKey,
      region: config.SES.region,
    }),
  },
}
```

If you plan on using environment variables for your AWS account, you need to create a `config/custom-environment-variables.json` file with the following content:

```json
{
  "SES": {
    "accessKey": "AWS_SES_ACCESS_KEY",
    "secretKey": "AWS_SES_SECRET_KEY",
    "region": "AWS_SES_REGION"
  }
}
```

## Usage

The `send-email` component contains a `send()` function which takes a single `mailData` object which needs to contain at least the following properties: `from`, `to`, `cc`, `bcc`, `subject`, `text`, `html`.  
It returns the resulting information provided by nodemailer. In most cases, you can just ignore it.

```js static
const Email = require('@pubsweet/component-send-email')
const config = require('config')

module.exports = {
  setupEmail: async toEmail => {
    const mailData = {
      from: config.get('mailer.from'),
      to: toEmail,
      cc: ccEmail,
      bcc: bccEmail,
      subject: 'You have been invited!',
      text: 'This is an email',
      html: '<p>This is an email</p>',
    }
    return Email.send(mailData)
  },
}
```
