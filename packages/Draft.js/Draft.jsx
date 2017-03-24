import React from 'react'
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-frontend/src/actions'

class Draft extends React.Component {
  constructor (props) {
    super(props)
    let editorState
    if (props.fragment && props.fragment.source) {
      let content = convertFromRaw(props.fragment)
      editorState = EditorState.createWithContent(content)
    } else {
      editorState = EditorState.createEmpty()
    }

    this.state = {editorState: editorState}
    this.onChange = this.onChange.bind(this)
  }

  onChange (editorState) {
    this.setState({editorState})
    let fragment = Object.assign(this.props.fragment, {
      source: convertToRaw(editorState.getCurrentContent())
    })

    this.props.actions.updateFragment(this.props.blog, fragment)
  }

  render () {
    const {editorState} = this.state
    return <Editor editorState={editorState} onChange={this.onChange} />
  }
}

Draft.propTypes = {
  blog: React.PropTypes.object,
  fragment: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapStateToProps (state, ownProps) {
  return {
    blog: state.collections[0],
    id: ownProps.params.id,
    fragment: state.fragments[ownProps.params.id]
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
