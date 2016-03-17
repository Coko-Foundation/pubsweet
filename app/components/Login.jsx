// import { Field } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'

import { loginUser } from '../actions'
import styles from '../scss/components/Login.local.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.redirectTo = this.props.location.query.next || '/admin/manager'
  }

  render () {
    const { error } = this.props
    return (
      <div className={styles.login + ' bootstrap'}>
        <Row>
          <Col xs={12} md={2} mdOffset={5}>
            { error ? <Alert bsStyle='warning'>{error}</Alert> : null}
            <h1>Login</h1>
            <form>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type='text' ref='username' className='form-control' placeholder='Username'/>
              </div>

              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' ref='password' className='form-control' placeholder='Password'/>
              </div>

              <button onClick={(event) => this.handleClick(event)}
                className={styles.button + ' btn btn-block btn-primary'}>
                Login
              </button>
              <p>Don't have an account? <a href='/signup'>Sign Up Here</a></p>
            </form>
          </Col>
        </Row>
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
