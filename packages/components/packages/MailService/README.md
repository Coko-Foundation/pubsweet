# Mail Service

## Configuration

In order to use this component, simply add the desired templates in the `src/templates/` folder and use them by matching the `emailType` parameter with the template name.

## Usage

Once you have your template setup, simply add a a case in the `switch` statement from `src/Mail.js`:

```js
switch (emailType) {
  case 'invitation-email':
    subject = 'You have been invited!'
    break
  default:
    subject = 'Welcome!'
    break
}
```
