var React = require('react')
var LensWriter = require('lens/LensWriter')
var Component = require('lens/node_modules/substance/ui/Component')
var DocumentSession = require('substance/model/DocumentSession')
// var CollabSession = require('substance/collab/CollabSession')
// var CollabClient = require('substance/collab/CollabClient')

// var $$ = Component.$$

// var LensArticleExporter = require('lens/model/LensArticleExporter')
// var LensArticleImporter = require('lens/model/LensArticleImporter')

// var exporter = new LensArticleExporter()
// var importer = new LensArticleImporter()

const JSONConverter = require('substance/model/JSONConverter')
const defaultLensArticle = require('lens/model/defaultLensArticle')

// LensWriter wrapped in a React component
// ------------------

class ReactLensWriter extends React.Component {

  getWriter () {
    return this
  }

  createDocumentSession () {
    var content = this.props.content ? this.props.content : {
      'schema': {'name': 'lens-article', 'version': '3.0.0'},
      'nodes': [
        {'type': 'container', 'id': 'main', 'nodes': ['p1']},
        {'type': 'article-meta', 'id': 'article-meta', 'title': 'Untitled', 'authors': [], 'abstract': 'Enter abstract'},
        {'type': 'paragraph', 'id': 'p1', 'content': 'Enter text here'}
      ]}
    var format = this.props.format ? this.props.format : 'json'
    var doc = this.createDoc(content, format)
    // var collabClient = new CollabClient({
    //   wsUrl: 'ws://' + document.location.hostname + ':8080'
    // })
    var documentSession = new DocumentSession(doc)

    // var documentSession = new CollabSession(doc, {
    //   docId: this.props.documentId,
    //   docVersion: this.props.version,
    //   collabClient: collabClient
    // })
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

  save (source, changes, callback) {
    var converter = new JSONConverter()
    this.props.onSave(converter.exportDocument(source), callback)
  }

  componentDidMount () {
    var el = React.findDOMNode(this)
    var documentSession = this.createDocumentSession()

    this.writer = Component.mount(LensWriter, {
      documentSession: documentSession,
      onSave: this.save.bind(this),
      onUploadFile: this.props.onUploadFile
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
  onUploadFile: React.PropTypes.func,
  format: React.PropTypes.string,
  documentId: React.PropTypes.string,
  content: React.PropTypes.object,
  version: React.PropTypes.number
}

module.exports = ReactLensWriter
