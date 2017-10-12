'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withAuthsome from './withAuthsome'

export class Authorize extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      authorized: false
    }
  }

  componentWillMount () {
    this.checkAuth(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.checkAuth(nextProps)
  }

  async checkAuth ({ authsome, currentUser, operation, object }) {
    try {
      const authorized = await authsome.can(currentUser && currentUser.id, operation, object)
      this.setState({
        authorized
      })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    return this.state.authorized ? this.props.children : this.props.unauthorized || null
  }
}

Authorize.propTypes = {
  currentUser: PropTypes.object,
  operation: PropTypes.string,
  object: PropTypes.object,
  children: PropTypes.node,
  unauthorized: PropTypes.node,
  authsome: PropTypes.object.isRequired
}

function mapState (state) {
  return {
    teams: state.teams,
    collections: state.collections,
    fragments: state.fragments,
    currentUser: state.currentUser.user
  }
}

export default compose(withAuthsome(), connect(mapState))(Authorize)
