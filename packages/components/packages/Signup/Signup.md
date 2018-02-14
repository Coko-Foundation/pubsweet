A login form

```js
const { reduxForm } = require('redux-form')

const SignupForm = reduxForm({
  form: 'signup',
  onChange: values => console.log(values),
})(Signup)
;<SignupForm />
```

Which can have an error message:

```js
const { reduxForm } = require('redux-form')

const SignupForm = reduxForm({
  form: 'signup-error',
  onSubmit: val => console.log(val),
})(Signup)
;<SignupForm error={'Yikes!'} />
```
