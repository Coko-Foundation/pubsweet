import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'

// Which editor component to import?
import Editor from '../../registry/Substance/Writer'

export default class EditorWrapper extends React.Component {
  constructor (props) {
    super(props)
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

    if (this.props.fragment) {
      editor = <Editor
        fragment={this.props.fragment}
        save={this.props.actions.updateFragment}
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
)(EditorWrapper)
