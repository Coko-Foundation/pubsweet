import React from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import '../scss/main'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux'

import BlogpostSummary from 'pubsweet-substance-components/Summary'

class Blog extends React.Component {
  constructor (props) {
    super(props)
    this.props.actions.hydrate()
  }

  render () {
    var fragments = this.props.fragments.map(function (blogpost) {
      if (blogpost.published === true) {
        return (<BlogpostSummary
          key={blogpost._id}
          fragment={blogpost}
        />)
      }
    })
    return (
      <div>
        {fragments}
      </div>
    )
  }
}

Blog.propTypes = {
  // Data
  collection: React.PropTypes.object,
  fragments: React.PropTypes.array,
  // Injected by React Redux
  errorMessage: React.PropTypes.string,
  pushState: React.PropTypes.func.isRequired,
  inputValue: React.PropTypes.string.isRequired,
  // Injected by React Router
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    collection: state.collections[0],
    fragments: state.fragments,
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
)(Blog)
