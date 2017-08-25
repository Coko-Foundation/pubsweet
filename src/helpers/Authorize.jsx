'use strict'

// import { includes } from 'lodash'
import Authsome from 'authsome'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import config from 'config'

class Authorize extends React.Component {
  constructor (props) {
    super(props)

    // TODO:
    // Ah, this is because for the client, we supply the
    // objects with owners in a different format than backend.
    // And authsome operates with the backend way. Need to rethink.
    this.object = Object.assign({}, this.props.object)
    if (Array.isArray(this.object.owners)) {
      this.object.owners = this.object.owners.map(
        owner => owner ? owner.id : null
      )
    }
    // /TODO

    this.authsome = new Authsome(
      this.props.authsome.mode,
      { teams: config.authsome.teams }
    )
  }

  render () {
    let { currentUser, operation } = this.props
    let object = this.object
    let permissions

    try {
      permissions = this.authsome.can(currentUser, operation, object)
    } catch (err) {
      permissions = false
    }

    if (permissions) {
      return this.props.children
    } else {
      return null
    }
  }
}

Authorize.propTypes = {
  currentUser: PropTypes.object,
  operation: PropTypes.string,
  object: PropTypes.object,
  teams: PropTypes.array,
  collections: PropTypes.array,
  fragments: PropTypes.object,
  children: PropTypes.node
}

function mapState (state) {
  return {
    teams: state.teams,
    collections: state.collections,
    fragments: state.fragments,
    currentUser: state.currentUser.user
  }
}

export default connect(mapState)(Authorize)
