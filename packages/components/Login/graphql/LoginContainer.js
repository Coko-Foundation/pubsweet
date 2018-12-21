import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from 'react-apollo'
import mutations from './mutations'
import Login from '../Login'

const getNextUrl = () => {
  const url = new URL(window.location.href)
  return `${window.location.protocol}//${
    window.location.host
  }${url.searchParams.get('next')}`
}

const localStorage = window.localStorage || undefined

const handleSubmit = (values, { props, setSubmitting, setErrors }) =>
  props
    .loginUser({
      variables: { input: values },
    })
    .then(({ data }) => {
      localStorage.setItem('token', data.loginUser.token)
      window.location = getNextUrl()
    })
    .catch(e => {
      if (e.graphQLErrors) {
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
  graphql(mutations.LOGIN_USER, {
    name: 'loginUser',
  }),
)(enhancedFormik)
