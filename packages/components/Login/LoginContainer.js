import { reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { loginUser } from './actions'

import Login from './Login'
import redirectPath from './redirect'

const onSubmit = (values, dispatch, { location }) => {
  dispatch(loginUser(values, redirectPath({ location })))
}

export default compose(
  reduxForm({
    form: 'login',
    onSubmit,
  }),
  connect(state => ({
    error: state.error,
  })),
)(Login)
