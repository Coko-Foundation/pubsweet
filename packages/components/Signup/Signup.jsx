import React from 'react'
import { Field } from 'formik'
import { override } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'

import {
  CenteredColumn,
  Link,
  H1,
  ErrorText,
  Button,
  TextField,
} from '@pubsweet/ui'

const FormContainer = styled.div`
  ${override('Login.FormContainer')};
`

const Logo = styled.div`
  ${override('Login.Logo')};
`

const UsernameInput = props => (
  <TextField label="Username" {...props.field} placeholder="Username" />
)

const EmailInput = props => (
  <TextField label="Email" {...props.field} placeholder="Email" type="email" />
)
const PasswordInput = props => (
  <TextField
    label="Password"
    {...props.input}
    placeholder="Password"
    type="password"
  />
)

const Signup = ({ error, handleSubmit, logo = null }) => (
  <CenteredColumn small>
    {logo && (
      <Logo>
        <img alt="pubsweet-logo" src={`${logo}`} />
      </Logo>
    )}
    <FormContainer>
      <H1>Sign up</H1>

      {error && <ErrorText>{error}</ErrorText>}

      <form onSubmit={handleSubmit}>
        <Field component={UsernameInput} name="username" />
        <Field component={EmailInput} name="email" />
        <Field component={PasswordInput} name="password" />
        <Button primary type="submit">
          Sign up
        </Button>
      </form>

      <div>
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </FormContainer>
  </CenteredColumn>
)

export default Signup
