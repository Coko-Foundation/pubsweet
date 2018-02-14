A login form

```js
const { reduxForm } = require('redux-form')

const LoginForm = reduxForm({
  form: 'login',
  onSubmit: val => console.log(val),
})(Login)
;<LoginForm />
```

Which can have an error message:

```js
const { reduxForm } = require('redux-form')

const LoginForm = reduxForm({
  form: 'login-error',
  onSubmit: val => {
    console.log(val)
    return Promise.reject(new SubmissionError({ _error: 'Error message' }))
  },
})(Login)
;<LoginForm />
```
