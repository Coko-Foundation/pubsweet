import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import React from 'react'
import PropTypes from 'prop-types'
import 'medium-draft/lib/index.css'
import './styles.scss'

import { Editor, createEditorState } from 'medium-draft'
import { convertToRaw } from 'draft-js'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import customImageSideButton from './CustomImageSideButton'


class MediumDraft extends React.Component {
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

function mapStateToProps (state, ownProps) {
  let fragmentId = ownProps.params.id
  return {
    fragmentId: fragmentId,
    blog: state.collections[0],
    id: ownProps.params.id,
    fragment: state.fragments[fragmentId]
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
)(MediumDraft)
