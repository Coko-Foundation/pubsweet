import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import config from 'config'
import qs from 'query-string'

import styles from './Login.local.scss'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.redirectTo =
      qs.parse(props.location.search).next ||
      config['pubsweet-client']['login-redirect']
  }

  handleClick(event) {
    event.preventDefault()
    const credentials = {
      username: this.usernameElement.value,
      password: this.passwordElement.value,
    }
    this.props.actions.loginUser(credentials, this.redirectTo)
  }

  render() {
    const { error } = this.props
    return (
      <div className="bootstrap" style={{ marginTop: 20 }}>
        <Grid>
          <Row>
            <Col md={2} mdOffset={5}>
              <img
                alt="pubsweet-logo"
                className={styles.loginLogo}
                src="/assets/pubsweet-rgb-small.jpg"
                style={{ maxWidth: '100%' }}
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              {error && (
                <Alert bsStyle="warning">
                  <i className="fa fa-exclamation-circle" />&nbsp; {error}
                </Alert>
              )}
            </Col>

            <Col className={styles.login} md={4} xs={12}>
              <h1>Login</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    className={
                      error ? 'form-control error' : 'form-control success'
                    }
                    placeholder="Username"
                    ref={input => (this.usernameElement = input)}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className={
                      error ? 'form-control error' : 'form-control success'
                    }
                    placeholder="Password"
                    ref={input => (this.passwordElement = input)}
                    type="password"
                  />
                </div>
                <button
                  className={`${styles.button} btn btn-block btn-primary`}
                  onClick={this.handleClick}
                >
                  Login
                </button>
                <p>
                  Don&apos;t have an account?<br />
                  <Link to="/signup">Sign up here</Link>
                </p>
                <p>
                  Forgot your password?<br />
                  <Link to="/password-reset">Reset password</Link>
                </p>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Login.propTypes = {
  error: PropTypes.string,
  actions: PropTypes.object,
  location: PropTypes.object,
}
