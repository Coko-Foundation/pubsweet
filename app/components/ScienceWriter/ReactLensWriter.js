var React = require('react')
var LensWriter = require('lens/LensWriter')
var Component = require('lens/node_modules/substance/ui/Component')
var DocumentSession = require('substance/model/DocumentSession')

const LensArticleExporter = require('lens/model/LensArticleExporter')
const LensArticleImporter = require('lens/model/LensArticleImporter')

// const defaultLensArticle = require('lens/model/defaultLensArticle')

// LensWriter wrapped in a React component
// ------------------

class ReactLensWriter extends React.Component {

  getWriter () {
    return this
  }

  createDocumentSession () {
    var content = this.props.content ? this.props.content : [
      '<article xmlns="http://substance.io/science-article/0.1.0" lang="en">',
      '<meta><title>Enter title</title><abstract>Enter abstract</abstract></meta>',
      '<resources></resources>',
      '<body><p id="p1">Enter your article here.</p></body>',
      '</article>'
    ].join('')

    var format = this.props.format ? this.props.format : 'xml'
    var doc = this.createDoc(content, format)
    var documentSession = new DocumentSession(doc)

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
      case 'xml':
        var importer = new LensArticleImporter()
        doc = importer.importDocument(content)
    }
    return doc
  }

  save (source, changes, callback) {
    var exporter = new LensArticleExporter()
    this.props.onSave(exporter.exportDocument(source), callback)
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
