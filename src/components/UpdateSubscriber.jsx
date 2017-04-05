import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import * as T from '../actions/types'

const actionMap = {
  'collection:create': T.CREATE_COLLECTION_SUCCESS,
  'collection:patch': T.UPDATE_COLLECTION_SUCCESS,
  'collection:delete': T.DELETE_COLLECTION_SUCCESS,
  'fragment:create': T.CREATE_FRAGMENT_SUCCESS,
  'fragment:patch': T.UPDATE_FRAGMENT_SUCCESS,
  'fragment:delete': T.DELETE_FRAGMENT_SUCCESS
}

class UpdateSubscriber extends Component {
  componentDidMount () {
    this.subscribe(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.eventSource) {
      this.subscribe(nextProps)
    }
  }

  componentWillUnmount () {
    if (this.eventSource) {
      this.eventSource.close()
      // delete this.eventSource
    }
  }

  subscribe (props) {
    const {currentUser, handleUpdate} = props

    if (currentUser) {
      // EventSource can't have Authorization header, so have to use query string
      const url = '/updates?access_token=' + encodeURIComponent(currentUser.token)

      this.eventSource = new EventSource(url)

      this.eventSource.onerror = e => console.error(e)

      this.eventSource.onmessage = e => {
        const {action, data} = JSON.parse(e.data)

        const actionType = actionMap[action]

        handleUpdate(actionType, data)
      }
    }
  }

  render () {
    const {currentUser} = this.props

    // TODO: show if authenticated + connected
    // TODO: pass eventSource to another component for display?

    return (
      <div>{ currentUser ? ':)' : '' }</div>
    )
  }
}

UpdateSubscriber.propTypes = {
  currentUser: PropTypes.object,
  storeUpdate: PropTypes.func,
}

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    handleUpdate: (type, body) => dispatch({type, ...body})
  })
)(UpdateSubscriber)
