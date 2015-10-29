import React from 'react'
import LensWriter from 'lens/ReactLensWriter'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import _ from 'lodash'

// Styles
import '../../node_modules/lens-writer/app/app.scss'
import '../scss/components/_substanceEditor'

export default class SubstanceEditor extends React.Component {
  constructor (props) {
    super(props)
    this._onSave = this._onSave.bind(this)
  }

  _onSave (content, callback) {
    let fragment = Object.assign(this.props.fragment, {
      source: content,
      presentation: content
    })
    this.props.actions.updateFragment(fragment)
    callback(null, content)
  }

  _onFileUpload (file, callback) {
    return callback(null, null)
  }

  render () {
    let editor
    let content
    if (this.props.fragment.source === '') {
      content = '<article xmlns="http://substance.io/science-article/0.1.0" lang="en"><meta><title>' +
      this.props.fragment.title + '</title><abstract>hello</abstract></meta><resources></resources>' +
      '<body><p id="p1">test</p></body></article>'
    } else {
      content = this.props.fragment.source
    }

    if (this.props.fragment) {
      editor = <LensWriter
        content={content}
        onSave={this._onSave}
        onFileUpload={this._onFileUpload}
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

SubstanceEditor.propTypes = {
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
)(SubstanceEditor)
