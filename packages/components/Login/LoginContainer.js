import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from 'react-apollo'

import { LOGIN_USER } from './graphql/mutations'
import Login from './Login'
import redirectPath from './redirect'

const localStorage = window.localStorage || undefined

const handleSubmit = (values, { props, setSubmitting, setErrors }) =>
  props
    .loginUser({ variables: { input: values } })
    .then(({ data, errors }) => {
      if (!errors) {
        localStorage.setItem('token', data.loginUser.token)
        props.history.push(redirectPath({ location: props.location }))
        setSubmitting(true)
      }
    })
    .catch(e => {
      if (e.graphQLErrors && e.graphQLErrors.length > 0) {
        setSubmitting(false)
        setErrors(e.graphQLErrors[0].message)
      }
    })

const enhancedFormik = withFormik({
  initialValues: {
    username: '',
    password: '',
  },
  mapPropsToValues: props => ({
    username: props.username,
    password: props.password,
  }),
  displayName: 'login',
  handleSubmit,
})(Login)

export default compose(graphql(LOGIN_USER, { name: 'loginUser' }))(
  enhancedFormik,
)
