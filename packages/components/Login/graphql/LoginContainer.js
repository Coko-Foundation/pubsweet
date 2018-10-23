import { compose } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from 'react-apollo'

import mutations from './mutations'
import Login from '../Login'
import redirectPath from '../redirect'

const localStorage = window.localStorage || undefined

const handleSubmit = (values, { props, setSubmitting, setErrors }) =>
  props
    .loginUser({ variables: { input: values } })
    .then(({ data, errors }) => {
      // console.log(props, '\\\n\nHello', '!!hello\n\n\n\n\n\n', 'hello')
      if (!errors) {
        localStorage.setItem('token', data.loginUser.token)
        props.history.push(redirectPath({ location: props.location }))
        setSubmitting(true)
      }
    })
    .catch(e => {
      // console.log(e)
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

export default compose(graphql(mutations.LOGIN_USER, { name: 'loginUser' }))(
  enhancedFormik,
)
