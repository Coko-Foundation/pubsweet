import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from 'react-apollo'

import { loginUser } from './mutations'
import Login from '../Login'
import redirectPath from '../redirect'

const localStorage = window.localStorage || undefined

const handleSubmit = (values, { props: { history, mutate, location } }) => {
  mutate({ variables: { input: values }, context: { online: true } }).then(
    ({ data }) => {
      localStorage.setItem('token', data.loginUser.token)
      history.push(redirectPath({ location }))
    },
  )
}

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

export default compose(graphql(loginUser))(enhancedFormik)
