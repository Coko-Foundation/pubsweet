import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'
import { Button, TextField } from '@pubsweet/ui'
import styled from 'styled-components'

const Root = styled.div`
  margin: 0 auto;
  width: 40ch;
`

const Title = styled.div`
  font-size: var(--font-size-heading-1);
  font-family: var(--font-heading);
  margin-bottom: calc(1 * var(--grid-unit));
  text-align: left;
`

const ErrorMessage = styled.div`
  color: var(--color-error);
`

const StyledLink = styled(Link)`
  color: var(--color-primary);
  border-bottom: 1px solid currentcolor;
  cursor: pointer;
  margin-left: var(--sub-grid-unit);
`

const Alternate = styled.div`
  color: var(--color-text);
  font-size: var(--font-size-base);
  text-align: left;
`

const Signup = Alternate.extend``
const ResetPassword = Alternate.extend``

const UsernameInput = props => <TextField label="Username" {...props.input} />
const PasswordInput = props => (
  <TextField label="Password" {...props.input} type="password" />
)

const Login = ({
  error,
  handleSubmit,
  signup = true,
  passwordReset = true,
}) => (
  <Root>
    <Title>Login</Title>

    {error && <ErrorMessage>{error}</ErrorMessage>}

    <form onSubmit={handleSubmit}>
      <Field component={UsernameInput} name="username" />
      <Field component={PasswordInput} name="password" />
      <Button primary type="submit">
        Login
      </Button>
    </form>

    {signup && (
      <Signup>
        <span>Don&apos;t have an account?</span>
        <StyledLink to="/signup">Sign up</StyledLink>
      </Signup>
    )}

    {passwordReset && (
      <ResetPassword>
        <span>Forgot your password?</span>
        <StyledLink to="/password-reset">Reset password</StyledLink>
      </ResetPassword>
    )}
  </Root>
)

Login.propTypes = {
  error: PropTypes.string,
  actions: PropTypes.object,
  location: PropTypes.object,
  signup: PropTypes.bool,
  passwordReset: PropTypes.bool,
}

// used by tests
export { Login, ErrorMessage, Signup, ResetPassword }

// used by consumers
export default Login
