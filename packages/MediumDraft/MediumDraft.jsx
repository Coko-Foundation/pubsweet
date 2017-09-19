import React from 'react'
import PropTypes from 'prop-types'
import 'medium-draft/lib/index.css'
import './styles.scss'

import { Editor, createEditorState } from 'medium-draft'
import { convertToRaw } from 'draft-js'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import customImageSideButton from './CustomImageSideButton'

export default class MediumDraft extends React.Component {
  constructor (props) {
    super(props)

    let editorState
    if (props.fragment && props.fragment.source) {
      editorState = createEditorState(props.fragment.source)
    } else {
      editorState = createEditorState()
    }

    if (this.props.blog) {
      this.props.actions.getCollections().then(result =>
        this.props.actions.getFragment(this.props.blog, {id: this.props.fragmentId})
      )
    }

    this.state = {editorState: editorState}
    this.onChange = this.onChange.bind(this)
  }

  onChange (editorState) {
    this.setState({editorState})
    let fragment = Object.assign(this.props.fragment, {
      source: convertToRaw(editorState.getCurrentContent()),
      presentation: mediumDraftExporter(editorState.getCurrentContent())
    })

    this.props.actions.updateFragment(this.props.blog, fragment)
  }

  componentDidMount () {
    this.refs.editor.focus()
  }

  render () {
    const { editorState } = this.state
    return (
      <Editor
        ref="editor"
        editorState={editorState}
        onChange={this.onChange}
        sideButtons={[{ title: 'Image', component: customImageSideButton(this.props.actions.fileUpload) }]}
      />
    )
  }
}

MediumDraft.propTypes = {
  fragmentId: PropTypes.string.isRequired,
  blog: PropTypes.object,
  fragment: PropTypes.object,
  actions: PropTypes.object
}
