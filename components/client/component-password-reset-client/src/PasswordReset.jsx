import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import styled from 'styled-components'
import { TextField, Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import { ApolloConsumer } from '@apollo/react-common'
import gql from 'graphql-tag'

const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation($username: String!) {
    sendPasswordResetEmail(username: $username)
  }
`

const RESET_PASSWORD = gql`
  mutation($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`

const Root = styled.div`
  margin: 0 auto;
  width: 40ch;
`

const Alert = styled.div`
  color: ${th('colorError')};
`

const BlockLink = styled(Link)`
  display: block;
`

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

  parsedQuery() {
    return queryString.parse(this.props.location.search)
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value })
  }

  handlePasswordChange = e => {
    this.setState({ password: e.target.value })
  }

  handleUsernameSubmit = (client, e) => {
    e.preventDefault()

    const { username } = this.state

    if (username) {
      this.initiatePasswordReset({ username }, client)
    } else {
      this.setState({ emailError: 'Please enter a username' })
    }
  }

  handlePasswordSubmit = (client, e) => {
    e.preventDefault()

    const { token } = this.parsedQuery()

    const { password } = this.state

    // TODO: enter twice and confirm?

    if (password) {
      this.resetPassword({ password, token }, client)
    } else {
      this.setState({ passwordError: 'Please enter a new password' })
    }
  }

  async initiatePasswordReset(data, client) {
    this.setState({
      emailSent: false,
      emailError: false,
      emailErrorMessage: null,
      emailSending: true,
    })

    try {
      const body = await client.mutate({
        mutation: SEND_PASSWORD_RESET_EMAIL,
        variables: {
          username: data.username,
        },
      })
      if (body.errors && body.errors[0]) {
        this.setState({
          emailError: true,
          emailErrorMessage: body.errors[0].message,
          emailSending: false,
        })
      } else {
        this.setState({
          emailSent: true,
          emailError: false,
          emailSending: false,
        })
      }
    } catch (err) {
      this.setState({
        emailError: true,
        emailErrorMessage: err.error || 'There was an unexpected error',
        emailSending: false,
      })
    }
  }

  async resetPassword(data, client) {
    this.setState({
      passwordChanged: false,
      passwordError: false,
      passwordErrorMessage: null,
      passwordSending: true,
    })

    try {
      const body = await client.mutate({
        mutation: RESET_PASSWORD,
        variables: {
          token: data.token,
          password: data.password,
        },
      })
      if (body.errors && body.errors[0]) {
        this.setState({
          passwordError: true,
          passwordErrorMessage: body.errors[0].message,
          passwordSending: false,
        })
      } else {
        this.setState({
          passwordChanged: true,
          passwordError: false,
          passwordSending: false,
        })
      }
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
      emailErrorMessage,
      emailSending,
      password,
      passwordChanged,
      passwordErrorMessage,
      passwordSending,
    } = this.state

    const { token } = this.parsedQuery()

    const buildForm = client => {
      this.handlePasswordSubmit1 = this.handlePasswordSubmit.bind(this, client)
      this.handleUsernameSubmit1 = this.handleUsernameSubmit.bind(this, client)
      if (passwordChanged) {
        return (
          <Alert>
            Your password has been changed, you can now{' '}
            <Link to="/login">login with the new password</Link>.
          </Alert>
        )
      }

      if (token) {
        // TODO: validate token on page load?

        return (
          <form onSubmit={this.handlePasswordSubmit1}>
            <TextField
              label="New password"
              onChange={this.handlePasswordChange}
              placeholder="Enter a new password…"
              type="password"
              value={password}
            />
            <Button disabled={passwordSending} primary type="submit">
              {passwordSending ? 'Saving…' : 'Save new password'}
            </Button>
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
        <form onSubmit={this.handleUsernameSubmit1}>
          <TextField
            label="Username"
            onChange={this.handleUsernameChange}
            placeholder="Enter your username"
            type="text"
            value={username}
          />
          <Button disabled={emailSending} primary type="submit">
            {emailSending ? 'Sending…' : 'Send email'}
          </Button>
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
      <Root>
        {buildError(emailErrorMessage)}
        {buildError(passwordErrorMessage)}

        <h1>Password reset</h1>
        <ApolloConsumer>{client => buildForm(client)}</ApolloConsumer>
        <p />
        <BlockLink to="/login">Return to login form</BlockLink>
      </Root>
    )
  }
}

PasswordReset.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(PasswordReset)
