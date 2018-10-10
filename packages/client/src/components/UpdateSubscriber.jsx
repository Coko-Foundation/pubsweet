import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import _ from 'lodash/fp'
import 'event-source-polyfill'

import * as T from '../actions/types'
import token from '../helpers/token'
import { selectCurrentUser } from '../selectors'

const actionMap = {
  'collection:create': T.CREATE_COLLECTION_SUCCESS,
  'collection:patch': T.UPDATE_COLLECTION_SUCCESS,
  'collection:delete': T.DELETE_COLLECTION_SUCCESS,
  'fragment:create': T.CREATE_FRAGMENT_SUCCESS,
  'fragment:patch': T.UPDATE_FRAGMENT_SUCCESS,
  'fragment:delete': T.DELETE_FRAGMENT_SUCCESS,
  'team:create': T.CREATE_TEAM_SUCCESS,
  'team:patch': T.UPDATE_TEAM_SUCCESS,
  'team:delete': T.DELETE_TEAM_SUCCESS,
}

export class UpdateSubscriber extends Component {
  constructor(props) {
    super(props)

    this.state = {
      connected: false,
      visible: false,
    }

    this.listeners = {}
  }

  componentWillMount() {
    this.subscribe(this.props)
    this.setState({ visible: UpdateSubscriber.visible() })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.eventSource) {
      this.subscribe(nextProps)
    }
  }

  componentWillUnmount() {
    if (this.eventSource) {
      this.removeAllEventListeners()
      this.eventSource.close()
    }
  }

  static visible() {
    return _.get('pubsweet-client.update-subscriber.visible', config, false)
  }

  // if haven't received a heartbeat for 30 seconds, try to reconnect
  monitor() {
    if (this.heartbeat) {
      window.clearTimeout(this.heartbeat)
    }

    this.heartbeat = window.setTimeout(() => {
      this.subscribe(this.props)
    }, 30000)
  }

  subscribe(props) {
    const { currentUser, handleUpdate } = props
    if (currentUser) {
      // ignore if not supported
      if (!window.EventSource) return

      // clear any existing heartbeat monitor
      if (this.heartbeat) {
        window.clearTimeout(this.heartbeat)
      }

      // close any existing connection
      if (this.eventSource) {
        this.eventSource.close()
      }

      // EventSource can't have Authorization header, so have to use query string
      const url = `/updates?access_token=${encodeURIComponent(token())}`

      this.eventSource = new window.EventSource(url)

      this.listeners.error = () => {
        switch (this.eventSource.readyState) {
          case 0: // CONNECTING
            this.setState({ connected: false })
            break

          case 2: // CLOSED
            this.setState({ connected: false })
            this.monitor() // try again in a while if not connected
            break

          default: // do nothing
        }
      }

      this.listeners.close = () => {
        this.setState({ connected: false })
        // this.monitor() // don't try to reconnect, as "close" without error is deliberate
      }

      this.listeners.message = event => {
        if (event.origin !== window.location.origin) {
          return
        }

        const { action, data } = JSON.parse(event.data)

        const actionType = actionMap[action]

        handleUpdate(actionType, data)
      }

      this.listeners.open = () => {
        this.setState({ connected: true })
      }

      // listen for a heartbeat message
      this.listeners.pulse = () => {
        this.monitor()
      }

      Object.keys(this.listeners).forEach(key => {
        this.eventSource.addEventListener(key, this.listeners[key])
      })
    }
  }

  removeAllEventListeners() {
    Object.keys(this.listeners).forEach(key => {
      this.eventSource.removeEventListener(key, this.listeners[key])
    })
  }

  render() {
    const { connected, visible } = this.state

    if (!visible) return null

    return (
      <i
        className="fa fa-wifi"
        style={{
          color: connected ? 'green' : 'gray',
        }}
      />
    )
  }
}

UpdateSubscriber.propTypes = {
  currentUser: PropTypes.object,
  handleUpdate: PropTypes.func,
}

export default connect(
  state => ({
    currentUser: selectCurrentUser(state),
  }),
  dispatch => ({
    handleUpdate: (type, body) => dispatch({ type, ...body }),
  }),
)(UpdateSubscriber)
