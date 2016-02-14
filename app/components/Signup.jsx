// import { Field } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signupUser } from '../actions'
import React, { Component, PropTypes } from 'react'

class Signup extends Component {
  render () {
    return (
      <div>
        <input type='text' ref='username' className='form-control' placeholder='Username'/>
        <input type='text' ref='email' className='form-control' placeholder='Email'/>
        <input type='password' ref='password' className='form-control' placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)} className='btn btn-primary'>
          Sign up
        </button>
      </div>
    )
  }

  handleClick (event) {
    const user = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.actions.signupUser(user)
  }
}

Signup.propTypes = {
    // Dispatch
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
