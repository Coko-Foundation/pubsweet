'use strict'

// import { includes } from 'lodash'
import config from '../../config' // eslint-disable-line
import Authsome from 'authsome'
import React from 'react'
import { connect } from 'react-redux'

class Authorize extends React.Component {
  constructor (props) {
    super(props)

    // TODO:
    // Ah, this is because for the frontend, we supply the
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
      config.authsome.mode,
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
      console.log(this.props.children)
      return this.props.children
    } else {
      return null
    }
  }
}

Authorize.propTypes = {
  currentUser: React.PropTypes.object,
  operation: React.PropTypes.string,
  object: React.PropTypes.object,
  teams: React.PropTypes.array,
  collections: React.PropTypes.array,
  fragments: React.PropTypes.object,
  children: React.PropTypes.node
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

