// import { Field } from 'react-redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { loginUser } from '../actions'
import React, { Component, PropTypes } from 'react'

class Login extends Component {
  render () {
    return (
      <div>
        <input type='text' ref='username' className='form-control' placeholder='Username'/>
        <input type='password' ref='password' className='form-control' placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)} className='btn btn-primary'>
          Login
        </button>
      </div>
    )
  }

  handleClick (event) {
    const credentials = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    this.props.actions.loginUser(credentials)
  }
}

Login.propTypes = {
    // Dispatch
  actions: PropTypes.object
}

function mapState (state) {
  return { auth: state.auth }
}

function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators({ loginUser }, dispatch)
  }
}

export default connect(
  mapState, mapDispatch
)(Login)
