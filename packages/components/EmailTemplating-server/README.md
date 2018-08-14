# Email Template

## About

The `email-template` component contains an `Email` class with two instance methods: `getBody` for retrieving the email body (html and text) and `sendEmail` for sending the email using the `send-email` component from PubSweet.

1.  `getBody({ body = {}, isReviewerInvitation = false })`:
    * accepts two parameters:
      * the `body` object, which for simple notifications should have only two properties: `paragraph` and `hasLink`
      * the `isReviewerInvitation` boolean to indicate wether or not you need to send a Reviewer Invitation, which uses a more complex template
    * returns the HTML and text parts of the email which can then be used to send it
1.  `sendEmail({ text, html })`:
    * accepts the text and HTML parts of an email and then uses the `send-email` component from PubSweet to actually send the email.

The `Email` class also provides a `constructor` whose properties will be used when sending the email:

1.  `type`: a String that can be either `user` or `system` which can be used in the unsubscribe process
1.  `toUser`: an Object with two properties: `email` and `name`. The `name` property will be used when addressing the recipient in the email content - for example: "Dear Dr. Rachel Smith".
1.  `content`: an Object which contains data about the email:
    1.  `subject`
    1.  `signatureName`
    1.  `ctaLink` - the URL which will be placed in the button
    1.  `ctaText` - the text which appears on the button
    1.  `unsubscribeLink`

## Usage

1.  **Notifications**
    These are the most basic emails, which contain at least a piece of text, called a `Paragraph` and may or may not contain an `Action Button`. The `paragraph` and `hasLink` are passed to the `getBody()` function as properties of the `body` parameter.

```javascript
const emailTemplate = require('@pubsweet/component-email-template')

const sendNotifications = ({ user, editor, collection, fragment }) => {
  const email = new emailTemplate({
    type: 'user',
    toUser: {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    },
    content: {
      subject: `${collection.customId}: Manuscript Update`,
      signatureName: `${editor.name}`,
      ctaLink: `http://localhost:3000/projects/${collection.id}/versions/${
        fragment.id
      }/details`,
      ctaText: 'MANUSCRIPT DETAILS',
      unsubscribeLink: `http://localhost:3000/unsubscribe/${user.id}`,
    },
  })

  const paragraph = `We are please to inform you that the manuscript has passed the technical check process and is now submitted. Please click the link below to access the manuscript.`

  const { html, text } = email.getBody({ paragraph, hasLink: true })
  email.sendEmail({ html, text })
}
```
