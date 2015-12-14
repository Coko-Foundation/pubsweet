import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import * as Actions from '../actions'

// Which reader to use?
import Blogpost from 'pubsweet-substance-components/Reader'
// import Blogpost from 'pubsweet-components/QuillReader'

class BlogpostWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.props.actions.hydrate()
  }

  render () {
    const { blogpost } = this.props

    if (blogpost) {
      return (
        <div className='blogpost'>
          <Blogpost content={blogpost.source} />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

BlogpostWrapper.propTypes = {
  // Data
  blogpost: React.PropTypes.object,
  // Injected by React Redux
  errorMessage: React.PropTypes.string,
  pushState: React.PropTypes.func.isRequired,
  inputValue: React.PropTypes.string.isRequired,
  // Injected by React Router
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    blogpost: _.find(state.fragments, function (f) {
      return f._id === state.router.params.id
    }),
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushState: pushState,
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogpostWrapper)
