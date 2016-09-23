/*global SimpleMDE */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
require('script!../../../node_modules/simplemde/dist/simplemde.min.js')
import * as Actions from '../../actions'
import _ from 'lodash'

// Styles
import '../../../node_modules/simplemde/dist/simplemde.min.css'
// import '../scss/components/_markdownEditor'

export default class MarkdownEditor extends React.Component {
  constructor (props) {
    super(props)
    this._onSave = this._onSave.bind(this)
  }

  _onSave (editor) {
    let fragment = Object.assign(this.props.fragment, {
      source: editor.value(),
      presentation: editor.options.previewRender(editor.value())
    })
    this.props.actions.updateFragment(fragment)
  }

  _onFileUpload (file, callback) {
    return callback(null, null)
  }

  componentDidMount () {
    if (this.props.fragment) {
      var editor = new SimpleMDE({
        element: document.getElementById('editor')
      })
      editor.value(this.props.fragment.source)

      editor.codemirror.on('change', function () {
        this._onSave(editor)
      }.bind(this))
    }
  }

  componentWillUnmount () {
    var classes = ['editor-toolbar', 'CodeMirror',
      'editor-preview-side', 'editor-statusbar']
    var parent = document.getElementById('editor').parentNode
    for (var i in classes) {
      var elementToRemove = parent.querySelector('.' + classes[i])
      elementToRemove && elementToRemove.remove()
    }
  }

  render () {
    return (
      <textarea id='editor'/>
    )
  }
}

MarkdownEditor.propTypes = {
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
)(MarkdownEditor)
