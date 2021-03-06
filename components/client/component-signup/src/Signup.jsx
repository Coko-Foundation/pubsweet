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

const SuccessText = styled.div`
  color: ${props => props.theme.colorSuccess};
`

const Logo = styled.div`
  width: 100%;
  max-width: 100px;
  margin: 0 auto;
  ${override('Login.Logo')};
`
Logo.displayName = 'Logo'

const UsernameInput = props => (
  <TextField label="Username" {...props.field} placeholder="Username" />
)

const EmailInput = props => (
  <TextField label="Email" {...props.field} placeholder="Email" type="email" />
)
const PasswordInput = props => (
  <TextField
    label="Password"
    {...props.field}
    placeholder="Password"
    type="password"
  />
)

const Signup = ({ values, handleSubmit, status, logo = null }) => (
  <CenteredColumn small>
    {logo && (
      <Logo>
        <img alt="pubsweet-logo" src={`${logo}`} />
      </Logo>
    )}
    <FormContainer>
      <H1>Sign up</H1>

      {status && status.success && <SuccessText>{status.success}</SuccessText>}
      {status && status.error && <ErrorText>{status.error}</ErrorText>}

      <form onSubmit={handleSubmit}>
        <Field component={UsernameInput} name="username" />
        <Field component={EmailInput} name="email" />
        <Field component={PasswordInput} name="password" />
        <Button primary type="submit">
          Sign up
        </Button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </FormContainer>
  </CenteredColumn>
)

export default Signup
