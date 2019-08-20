import { compose, withState, withHandlers } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from '@apollo/react-hoc'
import config from 'config'

import { LOGIN_USER } from './graphql/mutations'
import Login from './Login'

const getNextUrl = () => {
  const url = new URL(window.location.href)
  const redirectLink = config['pubsweet-client']['login-redirect']
  return `${url.searchParams.get('next') || redirectLink}`
}

const localStorage = window.localStorage || undefined

const handleSubmit = (values, { props, setSubmitting, setErrors }) =>
  props
    .loginUser({ variables: { input: values } })
    .then(({ data, errors }) => {
      if (!errors) {
        localStorage.setItem('token', data.loginUser.token)
        setTimeout(() => {
          props.onLoggedIn(getNextUrl())
        }, 100)
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

export default compose(
  graphql(LOGIN_USER, {
    name: 'loginUser',
  }),
  withState('redirectLink', 'loggedIn', null),
  withHandlers({
    onLoggedIn: ({ loggedIn }) => returnUrl => loggedIn(() => returnUrl),
  }),
)(enhancedFormik)
