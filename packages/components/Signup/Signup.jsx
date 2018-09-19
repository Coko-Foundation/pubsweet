import React from 'react'
import { Field } from 'formik'
import { isEmpty } from 'lodash'
import {
  CenteredColumn,
  Link,
  H1,
  ErrorText,
  Button,
  TextField,
} from '@pubsweet/ui'

const UsernameInput = props => <TextField label="Username" {...props.field} />
const EmailInput = props => (
  <TextField label="Email" {...props.field} type="email" />
)
const PasswordInput = props => (
  <TextField label="Password" {...props.field} type="password" />
)

const Signup = ({ errors, handleSubmit }) => (
  <CenteredColumn small>
    <H1>Sign up</H1>

    {!isEmpty(errors) && <ErrorText>{errors}</ErrorText>}

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
