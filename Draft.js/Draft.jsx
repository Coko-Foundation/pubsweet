import React from 'react'
import {Editor, EditorState} from 'draft-js'
import _ from 'lodash'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class Draft extends React.Component {
  constructor (props) {
    super(props)
    let editorState
    if (props.fragment) {
      editorState = EditorState.createWithContent(props.fragment)
    } else {
      editorState = EditorState.createEmpty()
    }

    this.state = {editorState: editorState}
  }

  onChange (editorState) {
    this.setState({editorState})
    this.props.actions.updateFragment(editorState.getCurrentContent())
  }

  render () {
    const {editorState} = this.state
    return <Editor editorState={editorState} onChange={this.onChange} />
  }
}

Draft.propTypes = {
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
)(Draft)
