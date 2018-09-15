import { withFormik } from 'formik'
import { loginUser } from './actions'

import Login from './Login'
import redirectPath from './redirect'

const handleSubmit = (values, dispatch, { location }) => {
  dispatch(loginUser(values, redirectPath({ location })))
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
})

export default enhancedFormik(Login)
