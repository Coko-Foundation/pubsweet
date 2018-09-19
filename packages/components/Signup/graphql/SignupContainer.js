import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from 'react-apollo'

import mutations from './mutations'
import Signup from '../Signup'

const handleSubmit = (values, { props, setSubmitting, setErrors }) => {
  props
    .signupUser({ variables: { input: values }, context: { online: false } })
    .then(({ data, errors }) => {
      if (!errors) {
        setSubmitting(true)
      }
    })
    .catch(e => {
      if (e.graphQLErrors) {
        setSubmitting(false)
        setErrors(e.graphQLErrors[0].message)
      }
    })
}

const enhancedFormik = withFormik({
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

export default compose(graphql(mutations.signupUser, { name: 'signupUser' }))(
  enhancedFormik,
)
