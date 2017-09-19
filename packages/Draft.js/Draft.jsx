import React from 'react'
import PropTypes from 'prop-types'
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js'

export default class Draft extends React.Component {
  constructor (props) {
    super(props)
    let editorState

    this.props.actions.getCollections().then(result =>
      this.props.actions.getFragment(result.collections[0], {id: this.props.id})
    )

    if (props.fragment && props.fragment.source) {
      let content = convertFromRaw(props.fragment.source)
      editorState = EditorState.createWithContent(content)
    } else {
      editorState = EditorState.createEmpty()
    }

    this.state = {editorState: editorState}
    this.onChange = this.onChange.bind(this)
  }

  componentDidUpdate (prevProps) {
    let editorState
    if (this.props.fragment && this.props.fragment.source && !prevProps.fragment) {
      let content = convertFromRaw(this.props.fragment.source)
      editorState = EditorState.createWithContent(content)
      this.setState({editorState: editorState})
    }
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
  id: PropTypes.string,
  blog: PropTypes.object,
  fragment: PropTypes.object,
  actions: PropTypes.object
}
