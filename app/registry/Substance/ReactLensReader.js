var React = require('react')
var LensReader = require('lens/LensReader')
var Component = require('lens/node_modules/substance/ui/Component')
var DocumentSession = require('substance/model/DocumentSession')

const JSONConverter = require('substance/model/JSONConverter')
const defaultLensArticle = require('lens/model/defaultLensArticle')

// LensReader wrapped in a React component
// ------------------

class ReactLensReader extends React.Component {

  // New props arrived, update the editor
  componentDidUpdate () {
    var doc = this.createDoc(this.props.content)
    this.reader.extendProps({
      doc: doc
    })
  }

  createDocumentSession () {
    var doc = this.createDoc(this.props.content)
    return new DocumentSession(doc)
  }

  createDoc (source) {
    var converter = new JSONConverter()
    var doc = defaultLensArticle.createEmptyArticle()
    converter.importDocument(doc, source)
    return doc
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
    return React.DOM.div({
      className: 'lens-reader-wrapper'
    })
  }
}

ReactLensReader.propTypes = {
  content: React.PropTypes.object // JSON source of the document
}

module.exports = ReactLensReader
