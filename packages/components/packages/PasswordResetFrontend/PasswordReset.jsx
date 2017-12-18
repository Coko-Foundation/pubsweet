import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  Alert,
  FormGroup,
  ControlLabel,
  Button,
  FormControl,
} from 'react-bootstrap'
import queryString from 'query-string'
import * as api from 'pubsweet-client/src/helpers/api'
import styles from './PasswordReset.local.scss'

class PasswordReset extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      username: '',
      emailSent: false,
      emailError: false,
      emailErrorMessage: null,
      emailSending: false,
      password: '',
      passwordChanged: false,
      passwordError: false,
      passwordErrorMessage: null,
      passwordSending: false,
    }
  }

  componentWillReceiveProps() {
    this.setState(this.getInitialState())
  }

  static post(data) {
    return api.create('/password-reset', data)
  }

  parsedQuery() {
    return queryString.parse(this.props.location.search)
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  handleUsernameSubmit = e => {
    e.preventDefault()

    const { username } = this.state

    if (username) {
      this.initiatePasswordReset({ username })
    } else {
      this.setState({ emailError: 'Please enter a username' })
    }
  }

  handlePasswordSubmit = e => {
    e.preventDefault()

    const { token, username } = this.parsedQuery()

    const { password } = this.state

    // TODO: enter twice and confirm?

    if (password) {
      this.resetPassword({ password, token, username })
    } else {
      this.setState({ passwordError: 'Please enter a new password' })
    }
  }

  async initiatePasswordReset(data) {
    this.setState({
      emailSent: false,
      emailError: false,
      emailErrorMessage: null,
      emailSending: true,
    })

    try {
      await PasswordReset.post(data)
      this.setState({
        emailSent: true,
        emailError: false,
        emailSending: false,
      })
    } catch (err) {
      this.setState({
        emailError: true,
        emailErrorMessage: err.error || 'There was an unexpected error',
        emailSending: false,
      })
    }
  }

  async resetPassword(data) {
    this.setState({
      passwordChanged: false,
      passwordError: false,
      passwordErrorMessage: null,
      passwordSending: true,
    })

    try {
      await PasswordReset.post(data)
      this.setState({
        passwordChanged: true,
        passwordError: false,
        passwordSending: false,
      })
    } catch (err) {
      this.setState({
        passwordError: true,
        passwordErrorMessage: err.error || 'There was an unexpected error',
        passwordSending: false,
      })
    }
  }

  render() {
    const {
      username,
      emailSent,
      emailError,
      emailErrorMessage,
      emailSending,
      password,
      passwordChanged,
      passwordError,
      passwordErrorMessage,
      passwordSending,
    } = this.state

    const { token } = this.parsedQuery()

    const buildForm = () => {
      if (passwordChanged) {
        return (
          <Alert bsStyle="success">
            Your password has been changed, you can now{' '}
            <Link to="/login">login with the new password</Link>.
          </Alert>
        )
      }

      if (token) {
        // TODO: validate token on page load?

        return (
          <form onSubmit={this.handlePasswordSubmit}>
            <FormGroup validationState={passwordError ? 'error' : 'success'}>
              <ControlLabel>New password</ControlLabel>

              <FormControl
                onChange={this.handlePasswordChange}
                placeholder="Enter a new password…"
                type="password"
                value={password}
              />
            </FormGroup>

            <div>
              <Button
                block
                bsStyle="primary"
                disabled={passwordSending}
                type="submit"
              >
                {passwordSending ? 'Saving…' : 'Save new password'}
              </Button>
            </div>
          </form>
        )
      }

      if (emailSent) {
        return (
          <Alert bsStyle="success">
            An email has been sent containing further instructions.
          </Alert>
        )
      }

      // TODO: allow email instead of username?

      return (
        <form onSubmit={this.handleUsernameSubmit}>
          <FormGroup validationState={emailError ? 'error' : 'success'}>
            <ControlLabel>Username</ControlLabel>

            <FormControl
              onChange={this.handleUsernameChange}
              placeholder="Enter your username"
              type="text"
              value={username}
            />
          </FormGroup>

          <div>
            <Button
              block
              bsStyle="primary"
              disabled={emailSending}
              type="submit"
            >
              {emailSending ? 'Sending…' : 'Send email'}
            </Button>
          </div>
        </form>
      )
    }

    const buildError = error => {
      if (!error) return null

      return (
        <Alert bsStyle="warning">
          <i className="fa fa-exclamation-circle" /> {buildErrorMessage(error)}
        </Alert>
      )
    }

    const buildErrorMessage = error => {
      if (error === 'expired') {
        return (
          <span>
            The token is only valid for 24 hours, please{' '}
            <Link to="/password-reset">request a new password reset email</Link>
          </span>
        )
      }

      if (error === 'invalid') {
        return (
          <span>
            The token is no longer valid, please{' '}
            <Link to="/password-reset">request a new password reset email</Link>
          </span>
        )
      }

      return error
    }

    return (
      <div className="bootstrap" style={{ marginTop: 20 }}>
        <Grid>
          <Row>
            <Col md={2} mdOffset={5}>
              <img
                alt="pubsweet-logo"
                className={styles.logo}
                src="/assets/pubsweet-rgb-small.jpg"
                style={{ maxWidth: '100%' }}
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              {buildError(emailErrorMessage)}
              {buildError(passwordErrorMessage)}
            </Col>

            <Col className={styles.passwordReset} md={4} xs={12}>
              <h1>Password reset</h1>

              {buildForm()}

              <div style={{ marginTop: 20 }}>
                <Link to="/login">Return to login form</Link>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

PasswordReset.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(PasswordReset)
