import React from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { isEmpty } from 'lodash'
import { override } from '@pubsweet/ui-toolkit'
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
const Logo = styled.div`
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  img {
    max-width: 100%;
    margin-bottom: 30px;
    margin-top: 30px;
    filter: grayscale(100%);
  }
`
const FormContainer = styled.div`
  ${override('ui.FormContainer')};
`

const UsernameInput = props => <TextField label="Username" {...props.field} />
const PasswordInput = props => (
  <TextField label="Password" {...props.field} type="password" />
)

const Login = ({
  errors,
  handleSubmit,
  logo = null,
  signup = true,
  passwordReset = true,
  redirectLink,
}) =>
  redirectLink ? (
    <Redirect to={redirectLink} />
  ) : (
    <CenteredColumn small>
      {logo && (
        <Logo>
          <img alt="pubsweet-logo" src={`${logo}`} />
        </Logo>
      )}
      <FormContainer>
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
      </FormContainer>
    </CenteredColumn>
  )

Login.propTypes = {
  error: PropTypes.string,
  actions: PropTypes.object,
  location: PropTypes.object,
  signup: PropTypes.bool,
  passwordReset: PropTypes.bool,
  logo: PropTypes.string,
}

export default Login
