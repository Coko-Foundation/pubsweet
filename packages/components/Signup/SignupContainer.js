import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'

import { signupUser } from './actions'
import Signup from './Signup'

const handleSubmit = (values, { props: { dispatch }, setErrors }) => {
  dispatch(signupUser(values, setErrors))
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

export default compose(connect(state => state))(enhancedFormik)
