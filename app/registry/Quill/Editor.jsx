import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import _ from 'lodash'

import React from 'react'
import ReactQuill from 'react-quill'
import './styles/Editor.scss'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this._onChange = this._onChange.bind(this)
  }

  _onChange (content) {
    let fragment = Object.assign(this.props.fragment, {
      source: content,
      presentation: content
    })
    this.props.actions.updateFragment(fragment)
  }

  render () {
    let editor
    if (this.props.fragment) {
      editor = <ReactQuill theme='snow'
        value={this.props.fragment.source}
        onChange={this._onChange}
      />
    } else {
      editor = <p>Loading</p>
    }

    return (
      <div>
        {editor}
      </div>
    )
  }
}

Editor.propTypes = {
  fragment: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapStateToProps (state) {
  console.log(state)
  return {
    fragment: _.find(state.fragments, function (f) {
      return f.id === state.router.params.id
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
)(Editor)
