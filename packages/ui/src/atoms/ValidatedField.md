A form field that displays the results of validation.

With an error:

```js
const { reduxForm } = require('redux-form')

const ValidatedFieldForm = reduxForm({
  form: 'validated-field-error',
  onChange: values => console.log(values),
})(ValidatedField)
;<ValidatedFieldForm
  name="error"
  validate={() => 'Required'}
  component={TextField}
/>
```

Or with success color only:

```js
const { reduxForm } = require('redux-form')

const ValidatedFieldForm = reduxForm({
  form: 'validated-field-success',
  onChange: values => console.log(values),
})(ValidatedField)
;<ValidatedFieldForm
  name="success"
  validate={() => undefined}
  component={TextField}
/>
```
