// import { Field } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signupUser } from '../actions'
import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

class Signup extends Component {
  render () {
    return (
      <div className='bootstrap'>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <h1>Signup</h1>
            <form>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type='text' ref='username' className='form-control' placeholder='Username'/>
              </div>
             <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='text' ref='email' className='form-control' placeholder='Email'/>
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' ref='password' className='form-control' placeholder='Password'/>
              </div>
              <button onClick={(event) => this.handleClick(event)} className='btn btn-primary'>
                Sign up
              </button>
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
}

function mapState (state) {
  return { auth: state.auth }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators({ signupUser }, dispatch)
  }
}

export default connect(
  mapState, mapDispatch
)(Signup)
