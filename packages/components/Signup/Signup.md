A signup form

```js
const { withFormik } = require('formik')

const SignupForm = withFormik({
  initialValues: {
    username: '',
    password: '',
  },
  mapPropsToValues: props => ({
    username: props.username,
    password: props.password,
  }),
  displayName: 'Signup',
  handleSubmit: val => console.log(val),
})(Signup)
;<SignupForm />
```

Can also have a logo:

```js
const { withFormik } = require('formik')

const SignupForm = withFormik({
  initialValues: {
    username: '',
    password: '',
  },
  mapPropsToValues: props => ({
    username: props.username,
    password: props.password,
  }),
  displayName: 'Signup',
  handleSubmit: val => console.log(val),
})(Signup)
;<SignupForm logo="pubsweet-logo.svg" />
```
