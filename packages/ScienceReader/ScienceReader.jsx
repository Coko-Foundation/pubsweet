import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'pubsweet-client/src/actions'

import './ScienceReader.scss'

import LensReader from 'lens/LensReader'
import Component from 'substance/ui/Component'
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
    this.reader = Component.mount(LensReader, {
      documentSession: this.createDocumentSession()
    }, this.el)
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
    const self = this
    const { blogpost } = self.props

    if (blogpost) {
      return (
        <div ref={function (c) { self.el = c }} className="blogpost">
          <div className="lens-reader-wrapper" />
        </div>
      )
    } else {
      return (
        <div ref={function (c) { self.el = c }} />
      )
    }
  }
}

ScienceReader.propTypes = {
  // Data
  blogpost: PropTypes.object,
  // Injected by React Redux
  // errorMessage: PropTypes.string,
  // Injected by React Router
  actions: PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    blogpost: state.fragments[ownProps.params.id]
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
