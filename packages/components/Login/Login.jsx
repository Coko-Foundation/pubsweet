import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { isEmpty } from 'lodash'
import {
  CenteredColumn,
  ErrorText,
  H1,
  Link,
  Button,
  TextField,
} from '@pubsweet/ui'

const UsernameInput = props => <TextField label="Username" {...props.field} />
const PasswordInput = props => (
  <TextField label="Password" {...props.field} type="password" />
)

const Login = ({
  errors,
  handleSubmit,
  signup = true,
  passwordReset = true,
  redirectLink,
}) =>
  redirectLink ? (
    <Redirect to={redirectLink} />
  ) : (
    <CenteredColumn small>
      <H1>Login</H1>

      {!isEmpty(errors) && <ErrorText>{errors}</ErrorText>}
      <form onSubmit={handleSubmit}>
        <Field component={UsernameInput} name="username" />
        <Field component={PasswordInput} name="password" />
        <Button primary type="submit">
          Login
        </Button>
      </form>

      {signup && (
        <>
          <span>Don&apos;t have an account? </span>
          <Link to="/signup">Sign up</Link>
        </>
      )}

      {passwordReset && (
        <>
          <span>Forgot your password? </span>
          <Link to="/password-reset">Reset password</Link>
        </>
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

export default Login
