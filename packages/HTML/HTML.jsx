import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import './HTML.scss'

class HTML extends React.Component {
  constructor (props) {
    super(props)
    this.props.actions.getCollections().then(result =>
      this.props.actions.getFragment(result.collections[0], {id: this.props.id})
    )
  }

  render () {
    const self = this
    const { fragment } = self.props

    if (fragment) {
      return (
        <div className="fragment" dangerouslySetInnerHTML={{__html: fragment.presentation}} />
      )
    } else {
      return (
        <div>No fragment found</div>
      )
    }
  }
}

HTML.propTypes = {
  // Data
  fragment: PropTypes.object,
  id: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    id: ownProps.params.id,
    fragment: state.fragments[ownProps.params.id]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HTML)
