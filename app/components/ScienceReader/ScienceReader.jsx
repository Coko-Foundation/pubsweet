import React from 'react'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
    if (this.reader) {
      this.reader.extendProps({
        documentSession: this.createDocumentSession()
      })
    } else {
      this.initializeReader()
    }
  }

  initializeReader () {
    var el = React.findDOMNode(this)
    this.reader = Component.mount(LensReader, {
      documentSession: this.createDocumentSession()
    }, el)
  }

  createDocumentSession () {
    var importer = new LensArticleImporter()
    var doc = importer.importDocument(this.props.blogpost.source)
    return new DocumentSession(doc)
  }

  componentDidMount () {
    if (this.props.blogpost) {
      this.createDocumentSession()
      this.initializeReader()
    }
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
  // Injected by React Router
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    blogpost: _.find(state.fragments, function (f) {
      return f.id === ownProps.params.id
    }),
    errorMessage: state.errorMessage
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
)(ScienceReader)
