// WIP EXPERIMENTAL

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import _ from 'lodash'
import React from 'react'
import 'trix/dist/trix.css'
require('script!../../node_modules/trix/dist/trix.js')

// import '../scss/components/_trixEditor'

class TrixEditor extends React.Component {
  constructor (props) {
    super(props)
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount () {
    document.querySelector('trix-editor').addEventListener('trix-change', this._onChange)
  }

  componentWillUnmount () {
    document.querySelector('trix-editor').removeEventListener('trix-change', this._onChange)
  }

  _onChange (event) {
    let element = document.querySelector('trix-editor')
    let fragment = Object.assign(this.props.fragment, {
      source: JSON.stringify(element.editor),
      presentation: element.innerHTML
    })
    this.props.actions.updateFragment(fragment)
  }

  render () {
    let editor

    if (this.props.fragment) {
      editor = <div>
        <input id='content' value={this.props.fragment.presentation} type='hidden' name='content'/>
        <trix-editor id='trix-editor' input='content'></trix-editor>
      </div>
    } else {
      editor = <trix-editor></trix-editor>
    }

    return (
      <div>
        {editor}
      </div>
    )
  }
}

TrixEditor.propTypes = {
  fragment: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapStateToProps (state) {
  console.log(state)
  return {
    fragment: _.find(state.fragments, function (f) {
      return f._id === state.router.params.id
    })
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
)(TrixEditor)
