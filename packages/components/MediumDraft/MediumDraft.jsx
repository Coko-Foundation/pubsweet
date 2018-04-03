import React from 'react'
import PropTypes from 'prop-types'
import { convertToRaw } from 'draft-js'
import { Editor, createEditorState } from 'medium-draft'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import 'medium-draft/lib/index.css'

import customImageSideButton from './CustomImageSideButton'
import './styles.scss'

export default class MediumDraft extends React.Component {
  constructor(props) {
    super(props)

    let editorState
    if (props.fragment && props.fragment.source) {
      editorState = createEditorState(props.fragment.source)
    } else {
      editorState = createEditorState()
    }

    if (this.props.blog) {
      this.props.actions.getCollections().then(result =>
        this.props.actions.getFragment(this.props.blog, {
          id: this.props.fragmentId,
        }),
      )
    }

    this.state = { editorState }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.editorElement.focus()
  }

  onChange(editorState) {
    this.setState({ editorState })
    const fragment = Object.assign(this.props.fragment, {
      source: convertToRaw(editorState.getCurrentContent()),
      presentation: mediumDraftExporter(editorState.getCurrentContent()),
    })

    this.props.actions.updateFragment(this.props.blog, fragment)
  }

  render() {
    const { editorState } = this.state
    return (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        ref={el => (this.editorElement = el)}
        sideButtons={[
          {
            title: 'Image',
            component: customImageSideButton(this.props.actions.fileUpload),
          },
        ]}
      />
    )
  }
}

MediumDraft.propTypes = {
  fragmentId: PropTypes.string.isRequired,
  blog: PropTypes.object,
  fragment: PropTypes.object,
  actions: PropTypes.object,
}
