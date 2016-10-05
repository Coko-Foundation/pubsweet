import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'pubsweet-frontend/src/actions'

import './ScienceWriter.scss'
import fetch from 'isomorphic-fetch'

import LensWriter from 'lens/LensWriter'
import Component from 'substance/ui/Component'
import DocumentSession from 'substance/model/DocumentSession'

import LensArticleExporter from 'lens/model/LensArticleExporter'
import LensArticleImporter from 'lens/model/LensArticleImporter'

class ScienceWriter extends React.Component {
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

  save (source, changes, callback) {
    var exporter = new LensArticleExporter()
    source = exporter.exportDocument(source)

    let doc = Object.assign(this.props.fragment, {
      source: source
    })

    this.props.actions.updateFragment(this.props.blog, doc)
    callback(null, source)
  }

  createDocumentSession () {
    var content = (this.props.fragment && this.props.fragment.source) ? this.props.fragment.source : `
      <article xmlns="http://substance.io/science-article/0.1.0" lang="en">
        <meta>
          <title>Enter title</title>
          <abstract>Enter abstract</abstract>
        </meta>
        <resources></resources>
        <body>
          <p id="p1">Enter your article here.</p>
        </body>
      </article>
    `

    var doc = this.createDoc(content, 'xml')
    var documentSession = new DocumentSession(doc)

    return documentSession
  }

  createDoc (content, format) {
    var doc

    switch (format) {
      case 'xml':
        var importer = new LensArticleImporter()
        doc = importer.importDocument(content)
    }
    return doc
  }

  componentDidMount () {
    var el = React.findDOMNode(this)
    var documentSession = this.createDocumentSession()

    this.writer = Component.mount(LensWriter, {
      documentSession: documentSession,
      onSave: this.save.bind(this),
      onUploadFile: this.uploadFile
    }, el)
  }

  // New props arrived, update the editor
  componentDidUpdate () {
    var documentSession = this.createDocumentSession()

    this.writer.extendProps({
      documentSession: documentSession
    })
  }

  componentWillUnmount () {
    this.writer.dispose()
  }

  render () {
    let editor

    if (this.props.fragment) {
      editor = React.DOM.div({
        className: 'lens-writer-wrapper'
      })
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

ScienceWriter.propTypes = {
  fragment: React.PropTypes.object,
  blog: React.PropTypes.object,
  actions: React.PropTypes.object,
  id: React.PropTypes.string.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    blog: state.collections[0],
    id: ownProps.params.id,
    fragment: state.fragments[ownProps.params.id]
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
)(ScienceWriter)
