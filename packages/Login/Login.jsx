import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Alert } from 'react-bootstrap'
import { Link } from 'react-router'
import { loginUser } from './actions'
import styles from './Login.local.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.redirectTo = this.props.location.query.next || CONFIG['pubsweet-client']['login-redirect']
  }
  render () {
    const self = this
    const { error } = self.props
    self.refs = {}
    return (
      <div className="bootstrap">
        <Grid>
          <Row>
            <Col md={2} mdOffset={5}>
              <img src="/assets/pubsweet-rgb-small.jpg" className="auth-logo" alt="pubsweet-logo"/>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              {error && <Alert bsStyle="warning"><i className="fa fa-exclamation-circle" />&nbsp; {error}</Alert>}
            </Col>

            <Col xs={12} md={4} className={styles.login}>
              <h1>Login</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text"
                    ref={function (c) { self.refs.username = c }} className={error ? 'form-control error' : 'form-control success'} placeholder="Username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password"
                    ref={function (c) { self.refs.password = c }} className={error ? 'form-control error' : 'form-control success'} placeholder="Password" />
                </div>
                <button onClick={this.handleClick}
                  className={styles.button + ' btn btn-block btn-primary'}>
                  Login
                </button>
                <p>Don't have an account?<br/><Link to="/signup">Sign up here</Link></p>
                <p>Forgot your password?<br/><Link to="/password-reset">Reset password</Link></p>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
  handleClick (event) {
    event.preventDefault()
    const credentials = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    this.props.actions.loginUser(credentials, this.redirectTo)
  }
}

Login.propTypes = {
  actions: PropTypes.object,
  location: PropTypes.object
}

function mapState (state) {
  return {
    error: state.error
  }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators({ loginUser }, dispatch)
  }
}

export default connect(
  mapState, mapDispatch
)(Login)
