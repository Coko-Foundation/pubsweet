import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import _ from 'lodash'

// Which editor component to import?
import Editor from 'pubsweet-substance-components/Writer'
// import Editor from '../../../node_modules/pubsweet-components/QuillEditor'

export default class EditorWrapper extends React.Component {
  constructor (props) {
    super(props)
  }

  fileUpload (file, callback) {
    return callback(null, null)
  }

  render () {
    let editor

    if (this.props.fragment) {
      editor = <Editor
        fragment={this.props.fragment}
        save={this.props.actions.updateFragment}
        fileUpload={this.fileUpload}
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
