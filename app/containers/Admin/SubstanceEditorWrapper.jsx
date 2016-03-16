import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
// import _ from 'lodash'
import fetch from 'isomorphic-fetch'

// Which editor component to import?
import Editor from '../../registry/Substance/Writer'

export default class EditorWrapper extends React.Component {
  constructor (props) {
    super(props)

    this.props.actions.getSubstanceDocument(this.props.id)
  }

  uploadFile (file, callback) {
    var reader = new FileReader() //eslint-disable-line
    var form = new FormData() //eslint-disable-line
    form.append('file', file)

    fetch('/api/upload', { method: 'POST', body: form })
      .then(function (res) {
        return res.text()
      }).then(function (text) {
        return callback(null, text)
      })
  }

  render () {
    let editor

    if (this.props.document) {
      editor = <Editor
        document={this.props.document}
        // save={this.props.actions.updateFragment}
        uploadFile={this.uploadFile}
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

EditorWrapper.propTypes = {
  document: React.PropTypes.object,
  actions: React.PropTypes.object,
  id: React.PropTypes.string.isRequired
}

function mapStateToProps (state) {
  console.log(state)
  return {
    id: state.router.params.id,
    document: state.substance
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
)(EditorWrapper)
