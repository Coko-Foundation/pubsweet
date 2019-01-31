import { compose } from 'recompose'
import { withFormik } from 'formik'

import { signupUser } from './actions'
import Signup from './Signup'

const handleSubmit = (values, dispatch) => {
  dispatch(signupUser(values))
}

const enhancedFormik = withFormik({
  initialValues: {
    username: '',
    email: '',
    password: '',
  },
  displayName: 'signup',
  handleSubmit,
})(Signup)

export default compose()(enhancedFormik)
