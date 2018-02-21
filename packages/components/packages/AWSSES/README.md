# AWS SES

## Configuration

In order to use this component, the following configuration needs to be added to a PubSweet application inside a section named `pubsweet-component-aws-ses`:

* `secretAccessKey`: the `AWS_SES_SECRET_KEY` value from the app's `.env` file
* `accessKeyId`: the `AWS_SES_ACCESS_KEY` value from the app's `.env` file
* `region`: the `AWS_SES_REGION` value from the app's `.env` file
* `sender`: the `EMAIL_SENDER` value from the app's `.env` file

For example:

```json
  mailer: {
    from: "sender@domain.com",
    transport: {
      "pubsweet-component-aws-ses": {
        "secretAccessKey": "process.env.AWS_SES_SECRET_KEY",
        "accessKeyId": "process.env.AWS_SES_ACCESS_KEY",
        "region": "process.env.AWS_SES_REGION",
        "sender": "process.env.EMAIL_SENDER",
    },
    }
  }
```

The `.env` file should contain the following data:

```bash
AWS_SES_SECRET_KEY = <secretKey>
AWS_SES_ACCESS_KEY = <accessKey>
EMAIL_SENDER = verified_ses_sender@domain.com
AWS_SES_REGION = region-name
```

Then, as soon as possible in your app you should add the `dotenv` package:

```js
require('dotenv').config()
```

## Usage

Here's how you can use the package in your code.

```js
const SES = require('pubsweet-components-aws-ses')
const fs = require('fs')

module.exports = {
  setupEmail: async (email, emailType) => {
    let subject
    const htmlBody = readFile(`${__dirname}/templates/${emailType}.html`)
    const textBody = readFile(`${__dirname}/templates/${emailType}.txt`)

    switch (emailType) {
      case 'invitation-email':
        subject = 'You have been invited!'
        break
      default:
        subject = 'Welcome!'
        break
    }

    SES.sendEmail(email, subject, textBody, htmlBody)
  },
}

const readFile = path =>
  fs.readFileSync(path, { encoding: 'utf-8' }, (err, file) => {
    if (err) {
      throw err
    } else {
      return file
    }
  })
```
