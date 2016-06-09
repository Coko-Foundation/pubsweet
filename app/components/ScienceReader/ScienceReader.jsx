import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import * as Actions from '../../actions'

import './ScienceReader.scss'

import LensReader from 'lens/LensReader'
import Component from 'lens/node_modules/substance/ui/Component'
import DocumentSession from 'substance/model/DocumentSession'
import LensArticleImporter from 'lens/model/LensArticleImporter'

class ScienceReader extends React.Component {
  constructor (props) {
    super(props)
    this.props.actions.hydrate()
  }

  // New props arrived, update the editor
  componentDidUpdate () {
    var doc = this.createDoc(this.props.blogpost.source)
    this.reader.extendProps({
      doc: doc
    })
  }

  createDocumentSession () {
    var importer = new LensArticleImporter()
    var content = importer.importDocument(this.props.blogpost.source)
    var doc = this.createDoc(content)
    return new DocumentSession(doc)
  }

  componentDidMount () {
    var el = React.findDOMNode(this)
    var documentSession = this.createDocumentSession()
    this.reader = Component.mount(LensReader, {
      documentSession: documentSession
    }, el)
  }

  componentWillUnmount () {
    this.reader.dispose()
  }

  render () {
    const { blogpost } = this.props

    if (blogpost) {
      return (
        <div className='blogpost'>
          <div className='lens-reader-wrapper'></div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

ScienceReader.propTypes = {
  // Data
  blogpost: React.PropTypes.object,
  // Injected by React Redux
  errorMessage: React.PropTypes.string,
  pushState: React.PropTypes.func.isRequired,
  inputValue: React.PropTypes.string.isRequired,
  // Injected by React Router
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    blogpost: _.find(state.fragments, function (f) {
      return f.id === state.router.params.id
    }),
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushState: pushState,
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScienceReader)
