import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from 'react-apollo'
import { SIGNUP_USER } from './graphql/mutations'

import Signup from './Signup'

const handleSubmit = (values, { props, setSubmitting, setErrors }) =>
  props.signupUser({
    variables: { input: values },
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
