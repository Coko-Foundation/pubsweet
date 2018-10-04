import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import {
  CenteredColumn,
  ErrorText,
  H1,
  Link,
  Button,
  TextField,
} from '@pubsweet/ui'
import styled from 'styled-components'

// These enable tests to select components
const Signup = styled.div``
const ResetPassword = styled.div``

const UsernameInput = props => <TextField label="Username" {...props.field} />
const PasswordInput = props => (
  <TextField label="Password" {...props.field} type="password" />
)

const Login = ({
  error,
  handleSubmit,
  signup = true,
  passwordReset = true,
}) => (
  <CenteredColumn small>
    <H1>Login</H1>

    {error && <ErrorText>{error}</ErrorText>}

    <form onSubmit={handleSubmit}>
      <Field component={UsernameInput} name="username" />
      <Field component={PasswordInput} name="password" />
      <Button primary type="submit">
        Login
      </Button>
    </form>

    {signup && (
      <Signup>
        <span>Don&apos;t have an account? </span>
        <Link to="/signup">Sign up</Link>
      </Signup>
    )}

    {passwordReset && (
      <ResetPassword>
        <span>Forgot your password? </span>
        <Link to="/password-reset">Reset password</Link>
      </ResetPassword>
    )}
  </CenteredColumn>
)

Login.propTypes = {
  error: PropTypes.string,
  actions: PropTypes.object,
  location: PropTypes.object,
  signup: PropTypes.bool,
  passwordReset: PropTypes.bool,
}

// used by tests
export { Login, ErrorText, Signup, ResetPassword }

// used by consumers
export default Login
