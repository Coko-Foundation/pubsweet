import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'
import { Button, TextField } from '@pubsweet/ui'

import classes from './Login.local.scss'

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
  <div className={classes.root}>
    <div className={classes.title}>Login</div>

    {error && <div className={classes.error}>{error}</div>}

    <form className={classes.form} onSubmit={handleSubmit}>
      <Field component={UsernameInput} name="username" />
      <Field component={PasswordInput} name="password" />
      <Button className={classes.button} primary type="submit">
        Login
      </Button>
    </form>

    {signup && (
      <div className={classes.alternate}>
        <span className={classes.message}>Don&apos;t have an account?</span>
        <Link className={classes.link} to="/signup">
          Sign up
        </Link>
      </div>
    )}

    {passwordReset && (
      <div className={classes.alternate}>
        <span className={classes.message}>Forgot your password?</span>
        <Link className={classes.link} to="/password-reset">
          Reset password
        </Link>
      </div>
    )}
  </div>
)

Login.propTypes = {
  error: PropTypes.string,
  actions: PropTypes.object,
  location: PropTypes.object,
  signup: PropTypes.bool,
  passwordReset: PropTypes.bool,
}

export default Login
