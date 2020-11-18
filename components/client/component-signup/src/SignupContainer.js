import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from '@apollo/client/react/hoc'
import { SIGNUP_USER } from './graphql/mutations'

import Signup from './Signup'

const handleSubmit = (
  values,
  { props, setSubmitting, setErrors, setValues, setStatus, resetForm },
) =>
  props
    .signupUser({
      variables: { input: values },
    })
    .then(({ data, errors }) => {
      if (!errors) {
        resetForm()
        setStatus({ success: 'User has been created successfully!' })
      }
    })
    .catch(e => {
      if (e.graphQLErrors) {
        setStatus({ error: e.graphQLErrors[0].message })
        setSubmitting(false)
      }
    })

const enhancedFormik = withFormik({
  initialValues: {
    username: '',
    email: '',
    password: '',
  },
  mapPropsToValues: props => ({
    username: props.username,
    password: props.password,
    email: props.email,
  }),
  displayName: 'signup',
  handleSubmit,
})(Signup)

export default compose(
  graphql(SIGNUP_USER, {
    name: 'signupUser',
  }),
)(enhancedFormik)
