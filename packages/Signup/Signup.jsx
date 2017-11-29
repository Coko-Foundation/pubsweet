import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Alert, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './Signup.local.scss'

export default class Signup extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    const self = this
    const { error } = self.props
    self.refs = {}
    return (
      <div className="bootstrap" style={{marginTop: 20}}>
        <Grid>
          <Row>
            <Col md={2} mdOffset={5}>
              <img src="/assets/pubsweet-rgb-small.jpg" className={styles.logo} alt="pubsweet-logo" style={{maxWidth: '100%'}}/>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              {error && <Alert bsStyle="warning"><i className="fa fa-exclamation-circle"/>&nbsp; {error}</Alert>}
            </Col>

            <Col xs={12} md={4} className={styles.signup}>
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
                <p>Already have an account?<br/><Link to="/login">Log in here</Link></p>
              </form>
            </Col>
          </Row>
        </Grid>
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
}
