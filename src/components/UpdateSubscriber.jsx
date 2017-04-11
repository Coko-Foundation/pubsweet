import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import * as T from '../actions/types'
import 'event-source-polyfill'

const actionMap = {
  'collection:create': T.CREATE_COLLECTION_SUCCESS,
  'collection:patch': T.UPDATE_COLLECTION_SUCCESS,
  'collection:delete': T.DELETE_COLLECTION_SUCCESS,
  'fragment:create': T.CREATE_FRAGMENT_SUCCESS,
  'fragment:patch': T.UPDATE_FRAGMENT_SUCCESS,
  'fragment:delete': T.DELETE_FRAGMENT_SUCCESS
}

class UpdateSubscriber extends Component {
  constructor (props) {
    super(props)

    this.state = {
      connected: false
    }
  }

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
      this.eventSource.removeAllListeners()
      this.eventSource.close()
      // delete this.eventSource
    }
  }

  // if haven't received a heartbeat for 5 seconds, try to reconnect
  monitor (event) {
    console.log(event)
    if (this.heartbeat) {
      window.clearTimeout(this.heartbeat)
    }

    this.heartbeat = window.setTimeout(() => {
      console.log('no heartbeat - reconnecting…')
      this.subscribe(this.props)
    }, 5000)
  }

  subscribe (props) {
    const {currentUser, handleUpdate} = props

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
      const url = '/updates?access_token=' + encodeURIComponent(currentUser.token)

      this.eventSource = new window.EventSource(url)

      this.eventSource.addEventListener('error', event => {
        switch (this.eventSource.readyState) {
          case window.EventSource.CONNECTING:
            this.setState({connected: false})
            break

          // case window.EventSource.OPEN:
          //   this.setState({connected: true})
          //   break

          case window.EventSource.CLOSED:
            this.setState({connected: false})
            this.monitor() // try again if not connected
            break
        }
      })

      this.eventSource.addEventListener('close', event => {
        this.setState({connected: false})
        // this.monitor() // don't try to reconnect, as "close" without error is deliberate
      })

      this.eventSource.addEventListener('message', event => {
        if (event.origin !== window.location.origin) {
          console.error('Message from unexpected origin', event.origin)
          return
        }

        console.log(event)

        const {action, data} = JSON.parse(event.data)

        const actionType = actionMap[action]

        handleUpdate(actionType, data)
      })

      this.eventSource.addEventListener('open', event => {
        this.setState({ connected: true })
      })

      // listen for a heartbeat message
      this.eventSource.addEventListener('❤️', event => {
        this.monitor(event)
      })
    }
  }

  render () {
    const {connected} = this.state

    // TODO: show if authenticated + connected
    // TODO: pass eventSource to another component for display?

    return (
      <div>{ connected ? 'connected' : 'not connected' }</div>
    )
  }
}

UpdateSubscriber.propTypes = {
  currentUser: PropTypes.object,
  handleUpdate: PropTypes.func
}

export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  dispatch => ({
    handleUpdate: (type, body) => dispatch({type, ...body})
  })
)(UpdateSubscriber)
