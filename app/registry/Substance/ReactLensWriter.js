var React = require('react')
var LensWriter = require('lens/LensWriter')
var Component = require('substance/ui/Component')
var CollabSession = require('substance/collab/CollabSession')
var CollabClient = require('substance/collab/CollabClient')

// var $$ = Component.$$

// var LensArticleExporter = require('lens/model/LensArticleExporter')
// var LensArticleImporter = require('lens/model/LensArticleImporter')

// var exporter = new LensArticleExporter()
// var importer = new LensArticleImporter()

const JSONConverter = require('substance/model/JSONConverter')
const defaultLensArticle = require('lens/model/defaultLensArticle')

// LensWriter wrapped in a React component
// ------------------

class ReactLensWriter {

  getWriter () {
    return this
  }

  // Delegators
  _onSave (doc, changes, cb) {
    // var xml = exporter.exportDocument(doc)
    // this.props.onSave(xml, cb)
  }

  _onUploadFile (file, cb) {
    // this.props.onUploadFile(file, cb)
  }

  getContent () {
    // var doc = this.writer.getDocument()
    // var xml = exporter.exportDocument(doc)
    // return xml
  }

  createDocumentSession () {
    var doc = this.createDoc(this.props.content, this.props.format)
    var collabClient = new CollabClient({
      wsUrl: 'ws://' + document.location.hostname + ':8080'
    })
    var documentSession = new CollabSession(doc, {
      docId: this.props.documentId,
      docVersion: this.props.version,
      collabClient: collabClient
    })
    return documentSession
  }

  // New props arrived, update the editor
  componentDidUpdate () {
    var documentSession = this.createDocumentSession()

    this.writer.extendProps({
      documentSession: documentSession
    })
  }

  createDoc (content, format) {
    var doc

    switch (format) {
      case 'json':
        var converter = new JSONConverter()
        doc = defaultLensArticle.createEmptyArticle()
        converter.importDocument(doc, content)
    }
    return doc
  }

  componentDidMount () {
    var el = React.findDOMNode(this)
    var documentSession = this.createDocumentSession()

    this.writer = Component.mount(LensWriter, {
      documentSession: documentSession,
      onSave: this._onSave,
      onUploadFile: this._onUploadFile
    }, el)
  }

  componentWillUnmount () {
    this.writer.dispose()
  }

  render () {
    return React.DOM.div({
      className: 'lens-writer-wrapper'
    })
  }
}

ReactLensWriter.propTypes = {
  onSave: React.PropTypes.func,
  format: React.PropTypes.string,
  documentId: React.PropTypes.string,
  content: React.PropTypes.object,
  version: React.PropTypes.number
}

module.exports = ReactLensWriter
