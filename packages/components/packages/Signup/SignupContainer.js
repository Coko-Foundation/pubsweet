import { connect } from 'react-redux'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form'

import { signupUser } from './actions'
import Signup from './Signup'

const onSubmit = (values, dispatch) => {
  dispatch(signupUser(values))
}

export default compose(
  reduxForm({
    form: 'signup',
    onSubmit,
  }),
  connect(state => ({
    error: state.error,
  })),
)(Signup)
