A Submit form

```js
const { withFormik } = require('formik')

const SignupForm = withFormik({
  initialValues: {
    username: '',
    password: '',
    email: '',
  },
  mapPropsToValues: props => ({
    username: props.username,
    email: props.email,
    password: props.password,
  }),
  displayName: 'signup',
  handleSubmit,
})(Signup)
;<SignupForm />
```

Which can have an error message:

```js
const { withFormik } = require('formik')

const SignupForm = withFormik({
  initialValues: {
    username: '',
    password: '',
    email: '',
  },
  mapPropsToValues: props => ({
    username: props.username,
    email: props.email,
    password: props.password,
  }),
  displayName: 'signup-error',
  handleSubmit: (values, { setErrors }) => setErrors('Error message'),
})(Signup)
;<SignupForm />
```
