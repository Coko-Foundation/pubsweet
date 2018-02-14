A login form

```js
const { reduxForm } = require('redux-form')

const LoginForm = reduxForm({
  form: 'login',
  onChange: values => console.log(values),
})(Login)

;<LoginForm handleSubmit={() => console.log('submitted')} />
```
