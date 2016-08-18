// import { Field } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import { Link } from 'react-router'

import { loginUser } from '../../actions'
import styles from './Login.local.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.redirectTo = this.props.location.query.next || '/manage/posts'
  }

  render () {
    const { error } = this.props
    return (
      <div className="bootstrap">
        <Row>
          <Col md={2} mdOffset={5}>
            <a href="#" className={styles.loginLogo}><img src="/pubsweet-rgb-small.jpg" alt="pubsweet-logo" /></a>
          </Col>
        </Row>
        <div className="container">
          <Row>
            <Col md={4}>{ error ? <Alert bsStyle="warning"><i className="fa fa-exclamation-circle" />&nbsp; {error}</Alert> : null}</Col>
            <Col xs={12} md={4} className={styles.login}>
              <h1>Login</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" ref="username" className={error ? 'form-control error' : 'form-control success'} placeholder="Username" />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" ref="password" className={error ? 'form-control error' : 'form-control success'} placeholder="Password" />
                </div>

                <button onClick={this.handleClick}
                  className={styles.button + ' btn btn-wide btn-primary'}>
                  Login
                </button>
                <p>Don't have an account?<br /><Link to="/signup">Sign Up Here</Link></p>
              </form>
            </Col>
          </Row>
        </div>
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
  location: PropTypes.object,
  error: PropTypes.string
}

function mapState (state) {
  return {
    auth: state.auth,
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
