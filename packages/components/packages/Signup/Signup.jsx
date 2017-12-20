import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Alert, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './Signup.local.scss'

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    const user = {
      username: this.usernameElement.value,
      email: this.emailElement.value,
      password: this.passwordElement.value,
    }
    this.props.actions.signupUser(user)
  }

  render() {
    const self = this
    const { error } = self.props
    self.refs = {}
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
              {error && (
                <Alert bsStyle="warning">
                  <i className="fa fa-exclamation-circle" />&nbsp; {error}
                </Alert>
              )}
            </Col>

            <Col className={styles.signup} md={4} xs={12}>
              <h1>Sign up</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    className="form-control"
                    placeholder="Username"
                    ref={el => (this.usernameElement = el)}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    placeholder="Email"
                    ref={el => (this.emailElement = el)}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    placeholder="Password"
                    ref={el => (this.passwordElement = el)}
                    type="password"
                  />
                </div>
                <button
                  className={`${styles.button} btn btn-block btn-primary`}
                  onClick={this.handleClick}
                >
                  Sign up
                </button>
                <p>
                  Already have an account?<br />
                  <Link to="/login">Log in here</Link>
                </p>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Signup.propTypes = {
  actions: PropTypes.object,
}
