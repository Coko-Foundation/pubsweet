import { withFormik } from 'formik'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { loginUser } from './actions'

import Login from './Login'
import redirectPath from './redirect'

const handleSubmit = (values, { props: { dispatch, location }, setErrors }) => {
  dispatch(loginUser(values, redirectPath({ location }), setErrors))
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

export default compose(connect(state => state))(enhancedFormik)
