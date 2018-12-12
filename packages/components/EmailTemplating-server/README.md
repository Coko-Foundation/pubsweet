# Email Templating

## About

The `email-templating` component contains an `EmailTemplate` class with one main instance method `sendEmail` for sending the email using the `send-email` component from PubSweet.

1.  `sendEmail()`:
    - uses the `send-email` component from PubSweet to actually send the email based on the Email properties passed in the constructor

The `Email` class also provides a `constructor` whose properties will be used when sending the email:

1.  `type`: a String that can be either `user` or `system` which can be used in the unsubscribe process
2.  `fromEmail`: a String indicating the from name and from email address: `Coko <team@coko.foundation>`
3.  `toUser`: an Object with two properties: `email` and `name`. The `name` property will be used when addressing the recipient in the email content - for example: "Dear Dr. Rachel Smith".
4.  `content`: an Object which contains properties about the email:
    - `subject`
    - `paragraph`: the main text part of the email body which informs the recipient
    - `signatureName` - the name which will appear in the signature
    - `ctaLink` - the URL which will be placed in the button
    - `ctaText` - the text which appears on the button
    - `unsubscribeLink`
    - `signatureJournal` - the journal or company name which will appear in the signature
5.  `bodyProps`:
    - `hasLink`: a boolean which indicates if the email body contains a CTA (big button) or not
    - `hasIntro`: a boolean which indicates if the email body contains the "Dear Dr. John" introduction or not.
    - `hasSignature`: a boolean which indicates if the email body contains a typical "Kind regards," signature or not

## Usage

1.  **Config**

    In order to use this component, you need the to add the following data in your main config file:

    ```javascript
      journal: {
        name: 'Coko Foundation',
        staffEmail: 'Coko <team@coko.foundation>',
        logo: 'https://coko.foundation/wp-content/uploads/2017/11/logo-coko.png',
        ctaColor: '#EE2B77', // the color of the email button
        logoLink: 'https://coko.foundation/',
        publisher: 'Coko Foundation', // this will appear in the email footer
        privacy: '', // a text containing information about the privacy policy that will appear in the email footer
        address: '2973 16th St., Suite 300, San Francisco, CA 94103', // the address in the footer
      },
    ```

1.  **Dependencies**

    - [Pubsweet's Send Email](https://www.npmjs.com/package/@pubsweet/component-send-email)
    - [Configure your Node.js Applications](https://www.npmjs.com/package/config)
    - [Handlebars.js](https://www.npmjs.com/package/handlebars)

1.  **Notifications**

    These are the most basic emails, which contain at least a piece of text, called a paragraph, and may or may not contain an intro, an action button and a signature.

    ![notification](https://gitlab.coko.foundation/xpub/xpub-faraday/uploads/27cb6acc8ff4a07758f55e5ea0504d28/notification.png)

    ```javascript
    const EmailTemplate = require('@pubsweet/component-email-template')
    const config = require('config')

    const { name: journalName, fromEmail: staffEmail } = config.get('journal')

    const paragraph = `We are please to inform you that the manuscript has passed the technical check process and is now submitted. Please click the link below to access the manuscript.`

    const sendNotifications = ({ user, editor, collection, fragment }) => {
      const email = new EmailTemplate({
        type: 'user',
        fromEmail,
        toUser: {
          email: user.email,
          name: `${user.lastName}`,
        },
        content: {
          ctaText: 'MANUSCRIPT DETAILS',
          signatureJournal: journalName,
          signatureName: `${editor.name}`,
          subject: `${collection.customId}: Manuscript Update`,
          paragraph,
          unsubscribeLink: `http://localhost:3000/unsubscribe/${user.id}`,
          ctaLink: `http://localhost:3000/projects/${collection.id}/versions/${
            fragment.id
          }/details`,
        },
        bodyProps: {
          hasLink: true,
          hasIntro: true,
          hasSignature: true,
        },
      })

      return email.sendEmail()
    }
    ```

1.  **Reviewer Invitation**
    This email template is specific to Hindawi and it requires some data that might not be available in other PubSweet apps.

    ![invitation](https://gitlab.coko.foundation/xpub/xpub-faraday/uploads/438af32b5da5532ed2bd6ca46588be50/Screen_Shot_2018-08-14_at_12.49.37.png)
