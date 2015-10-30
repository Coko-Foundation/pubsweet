import React from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'

import '../scss/main'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux'

import Blogpost from '../components/BlogRoll/Blogpost'

class BlogRoll extends React.Component {
  constructor (props) {
    super(props)
    this.props.actions.hydrate()
  }

  render () {
    var fragments = this.props.fragments.map(function (blogpost) {
      if (blogpost.status === 'published') {
        return (<Blogpost
          key={blogpost._id}
          blogpost={blogpost}
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

BlogRoll.propTypes = {
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
)(BlogRoll)
