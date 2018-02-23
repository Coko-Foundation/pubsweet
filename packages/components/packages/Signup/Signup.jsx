import React from 'react'
import { Field } from 'redux-form'
import {
  CenteredColumn,
  Link,
  H1,
  ErrorText,
  Button,
  TextField,
} from '@pubsweet/ui'

const UsernameInput = props => <TextField label="Username" {...props.input} />
const EmailInput = props => (
  <TextField label="Email" {...props.input} type="email" />
)
const PasswordInput = props => (
  <TextField label="Password" {...props.input} type="password" />
)

const Signup = ({ error, handleSubmit }) => (
  <CenteredColumn small>
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
  </CenteredColumn>
)

export default Signup
