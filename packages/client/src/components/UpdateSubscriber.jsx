import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import _ from 'lodash/fp'

import * as T from '../actions/types'
import 'event-source-polyfill'
import token from '../helpers/token'

const actionMap = {
  'collection:create': T.CREATE_COLLECTION_SUCCESS,
  'collection:patch': T.UPDATE_COLLECTION_SUCCESS,
  'collection:delete': T.DELETE_COLLECTION_SUCCESS,
  'fragment:create': T.CREATE_FRAGMENT_SUCCESS,
  'fragment:patch': T.UPDATE_FRAGMENT_SUCCESS,
  'fragment:delete': T.DELETE_FRAGMENT_SUCCESS,
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

  componentDidMount() {
    this.subscribe(this.props)
    this.setState({ visible: this.visible() })
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
      // delete this.eventSource
    }
  }

  visible() {
    return _.get('pubsweet-client.update-subscriber.visible', config, false)
  }

  // if haven't received a heartbeat for 30 seconds, try to reconnect
  monitor() {
    if (this.heartbeat) {
      window.clearTimeout(this.heartbeat)
    }

    this.heartbeat = window.setTimeout(() => {
      // console.log('no heartbeat - reconnecting…')
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
        // console.log('clearing timeout')
        window.clearTimeout(this.heartbeat)
      }

      // close any existing connection
      if (this.eventSource) {
        // console.log('closing')
        this.eventSource.close()
      }

      // EventSource can't have Authorization header, so have to use query string
      const url = '/updates?access_token=' + encodeURIComponent(token())

      this.eventSource = new window.EventSource(url)

      this.listeners.error = () => {
        // console.log('error', this.eventSource.readyState)

        switch (this.eventSource.readyState) {
          case 0: // CONNECTING
            this.setState({ connected: false })
            break

          case 2: // CLOSED
            this.setState({ connected: false })
            this.monitor() // try again in a while if not connected
            break
        }
      }

      this.listeners.close = () => {
        // console.log('close')

        this.setState({ connected: false })
        // this.monitor() // don't try to reconnect, as "close" without error is deliberate
      }

      this.listeners.message = event => {
        // console.log('message', event)

        if (event.origin !== window.location.origin) {
          // console.error('Message from unexpected origin', event.origin)
          return
        }

        const { action, data } = JSON.parse(event.data)

        const actionType = actionMap[action]

        handleUpdate(actionType, data)
      }

      this.listeners.open = () => {
        // console.log('open')
        this.setState({ connected: true })
      }

      // listen for a heartbeat message
      this.listeners.pulse = () => {
        // console.log('❤️')
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
    currentUser: state.currentUser,
  }),
  dispatch => ({
    handleUpdate: (type, body) => dispatch({ type, ...body }),
  }),
)(UpdateSubscriber)
