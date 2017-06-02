import React from 'react'
import { Link, withRouter } from 'react-router'
import fetch from 'isomorphic-fetch'
import PropTypes from 'prop-types'
import { Row, Col, Alert, FormGroup, ControlLabel, Button, FormControl } from 'react-bootstrap'

const API_ENDPOINT = CONFIG['pubsweet-server']['API_ENDPOINT']

class PasswordReset extends React.Component {
  constructor (props) {
    super(props)

    this.state = this.getInitialState()
  }

  getInitialState () {
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
      passwordSending: false
    }
  }

  componentWillReceiveProps () {
    this.setState(this.getInitialState())
  }

  post (data) {
    return fetch(API_ENDPOINT + '/password-reset', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value})
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleUsernameSubmit = (e) => {
    e.preventDefault()

    const {username} = this.state

    if (username) {
      this.initiatePasswordReset({username})
    } else {
      this.setState({error: 'Please enter a username'})
    }
  }

  handlePasswordSubmit = (e) => {
    e.preventDefault()

    const {location: {query: {token, username}}} = this.props

    const {password} = this.state

    // TODO: enter twice and confirm?

    if (password) {
      this.resetPassword({password, token, username})
    } else {
      this.setState({error: 'Please enter a new password'})
    }
  }

  initiatePasswordReset (data) {
    this.setState({
      emailSent: false,
      emailError: false,
      emailErrorMessage: null,
      emailSending: true
    })

    this.post(data).then(response => {
      switch (response.status) {
        case 200:
          this.setState({
            emailSent: true,
            emailError: false,
            emailSending: false
          })
          break

        case 400:
          response.json().then(body => {
            this.setState({
              emailError: true,
              emailErrorMessage: body.error,
              emailSending: false
            })
          })
          break

        default:
          this.setState({
            emailError: true,
            emailErrorMessage: 'There was an unexpected error',
            emailSending: false
          })
          break
      }
    })
  }

  resetPassword (data) {
    this.setState({
      passwordChanged: false,
      passwordError: false,
      passwordErrorMessage: null,
      passwordSending: true
    })

    this.post(data).then(response => {
      switch (response.status) {
        case 200:
          this.setState({
            passwordChanged: true,
            passwordError: false,
            passwordSending: false
          })
          break

        case 400:
          response.json().then(body => {
            this.setState({
              passwordError: true,
              passwordErrorMessage: body.error,
              passwordSending: false
            })
          })
          break

        default:
          this.setState({
            passwordError: true,
            passwordErrorMessage: 'There was an unexpected error',
            passwordSending: false
          })
          break
      }
    })
  }

  render () {
    const {username, emailSent, emailError, emailErrorMessage, emailSending, password, passwordChanged, passwordError, passwordErrorMessage, passwordSending} = this.state

    const {location: {query: {token}}} = this.props

    const buildForm = () => {
      if (passwordChanged) {
        return (
          <Alert bsStyle="success">Your password has been changed, you can now <Link to="/login">login with the new password</Link>.</Alert>
        )
      }

      if (token) {
        // TODO: validate token on page load?
        // TODO: add username to the URL as well?

        return (
          <form onSubmit={this.handlePasswordSubmit}>
            <FormGroup validationState={passwordError ? 'error' : 'success'}>
              <ControlLabel>New password</ControlLabel>

              <FormControl type="password" onChange={this.handlePasswordChange} value={password} placeholder="Enter a new password…"/>
            </FormGroup>

            <div>
              <Button type="submit" bsStyle="primary" bsSize="large" disabled={passwordSending}>
                {passwordSending ? 'Saving…' : 'Save new password'}
              </Button>
            </div>
          </form>
        )
      }

      if (emailSent) {
        return (
          <Alert bsStyle="success">An email has been sent containing further instructions.</Alert>
        )
      }

      // TODO: allow email instead of username?

      return (
        <form onSubmit={this.handleUsernameSubmit}>
          <FormGroup validationState={emailError ? 'error' : 'success'}>
            <ControlLabel>Username</ControlLabel>

            <FormControl type="text" onChange={this.handleUsernameChange} value={username} placeholder="Enter your username"/>
          </FormGroup>

          <div>
            <Button type="submit" bsStyle="primary" bsSize="large" disabled={emailSending}>
              {emailSending ? 'Sending…' : 'Send email'}
            </Button>
          </div>
        </form>
      )
    }

    const buildError = (error) => {
      if (!error) return null

      if (error === 'expired') {
        error = (
          <span>The token is only valid for 24 hours, please <Link to="/password-reset">request a new password reset email</Link></span>
        )
      }

      if (error === 'invalid') {
        error = (
          <span>The token is no longer valid, please <Link to="/password-reset">request a new password reset email</Link></span>
        )
      }

      return (
        <Alert bsStyle="warning">
          <i className="fa fa-exclamation-circle"/> {error}
        </Alert>
      )
    }

    return (
      <div className="bootstrap" style={{marginTop: 20}}>
        <div className="container">
          <Row>
            <Col md={4}>
              {buildError(emailErrorMessage)}
              {buildError(passwordErrorMessage)}
            </Col>

            <Col xs={12} md={4}>
              <h1>Password reset</h1>

              {buildForm()}

              <div style={{marginTop: 20}}>
                <Link to="/login">Return to login form</Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

PasswordReset.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(PasswordReset)
