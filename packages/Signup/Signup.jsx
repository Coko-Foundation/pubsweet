import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { Alert, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

import { signupUser } from './actions'
import styles from './Signup.local.scss'

class Signup extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    const self = this
    const { error } = self.props
    self.refs = {}
    return (
      <div className={styles.signup + ' bootstrap'}>
        <Row>
          <Col xs={12} md={2} mdOffset={5}>
            {error ? <Alert bsStyle="warning">{error}</Alert> : null}
            <h1>Sign up</h1>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text"
                  ref={function (c) { self.refs.username = c }} className="form-control" placeholder="Username" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text"
                  ref={function (c) { self.refs.email = c }} className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                  ref={function (c) { self.refs.password = c }} className="form-control" placeholder="Password" />
              </div>
              <button onClick={this.handleClick} className={styles.button + ' btn btn-block btn-primary'}>
                Sign up
              </button>
              <p>Already have an account? <Link to="/login">Log in here</Link></p>
            </form>
          </Col>
        </Row>
      </div>
    )
  }

  handleClick (event) {
    event.preventDefault()
    const user = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.actions.signupUser(user)
  }
}

Signup.propTypes = {
  actions: PropTypes.object
  // error: PropTypes.string
}

function mapState (state) {
  return {
    error: state.error
  }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators({ signupUser }, dispatch)
  }
}

export default connect(
  mapState, mapDispatch
)(Signup)
