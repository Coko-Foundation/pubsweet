# AWS SES Configuration

In order to use this component, the following configuration needs to be added to a PubSweet application inside a section named `pubsweet-component-aws-ses`:

* `secretAccessKey`: the `AWS_SES_SECRET_KEY` value from the app's `.env` file
* `accessKeyId`: the `AWS_SES_ACCESS_KEY` value from the app's `.env` file
* `region`: the `AWS_SES_REGION` value from the app's `.env` file
* `sender`: the `EMAIL_SENDER` value from the app's `.env` file

For example:

```json
"pubsweet-component-aws-ses": {
    "secretAccessKey": "process.env.AWS_SES_SECRET_KEY",
    "accessKeyId": "process.env.AWS_SES_ACCESS_KEY",
    "region": "process.env.AWS_SES_REGION",
    "sender": "process.env.EMAIL_SENDER",
  },
```

In order to use `component-aws-ses` you first need to have a `.env` file containing AWS data in the root folder of the starting point of your application.

The `.env` file contain the following data:

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

# `component-aws-ses` API

A list of endpoints that help you upload, download and delete S3 files.

## Send an email [POST]

#### Request

`POST /api/email`

#### Request body

All parameters are `required`

```json
{
  "email": "to_email@domain.com",
  "subject": "Example subject",
  "textBody": "this is an email",
  "htmlBody": "<p><b>This</b> is an <i>email</i>"
}
```

#### Response

```json
HTTP/1.1 204
```
