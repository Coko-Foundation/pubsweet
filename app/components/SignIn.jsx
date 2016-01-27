import React from 'react'
import '../scss/main'

import { EmailSignInForm } from 'redux-auth'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <EmailSignInForm />
  }
}

export default SignIn
