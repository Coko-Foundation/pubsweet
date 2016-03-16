var React = require('react');
var LensWriter = require('lens/LensWriter');
var Component = require('substance/ui/Component');
var CollabSession = require('substance/collab/CollabSession');
var CollabClient = require('substance/collab/CollabClient');

var $$ = Component.$$;

// var LensArticleExporter = require('lens/model/LensArticleExporter');
// var LensArticleImporter = require('lens/model/LensArticleImporter');

// var exporter = new LensArticleExporter();
// var importer = new LensArticleImporter();

const JSONConverter = require('substance/model/JSONConverter')
const defaultLensArticle = require('lens/model/defaultLensArticle')

// LensWriter wrapped in a React component
// ------------------

var ReactLensWriter = React.createClass({

  getWriter: function() {
    return this;
  },

  // Delegators
  _onSave: function(doc, changes, cb) {
    var xml = exporter.exportDocument(doc);
    this.props.onSave(xml, cb);
  },

  _onUploadFile: function(file, cb) {
    this.props.onUploadFile(file, cb);
  },

  getContent: function() {
    var doc = this.writer.getDocument();
    var xml = exporter.exportDocument(doc);
    return xml;
  },

  createDocumentSession: function () {
    var doc = this.createDoc(this.props.content, this.props.format)
    var collabClient = new CollabClient({
      wsUrl: 'ws://localhost:8080'
    })
    var documentSession = new CollabSession(doc, {
      docId: this.props.documentId,
      docVersion: this.props.version,
      collabClient: collabClient
    })
    return documentSession
  },

  // New props arrived, update the editor
  componentDidUpdate: function() {
    var documentSession = this.createDocumentSession()

    this.writer.extendProps({
      documentSession: documentSession
    });
  },

  createDoc: function(content, format) {
    var doc

    switch(format) {
      case 'json':
        var converter = new JSONConverter()
        var doc = defaultLensArticle.createEmptyArticle()
        converter.importDocument(doc, content)
    }
    return doc;
  },

  componentDidMount: function() {
    var el = React.findDOMNode(this);
    var documentSession = this.createDocumentSession()

    this.writer = Component.mount(LensWriter, {
      documentSession: documentSession,
      onSave: this._onSave,
      onUploadFile: this._onUploadFile
    }, el);
  },

  componentWillUnmount: function() {
    this.writer.dispose();
  },

  render: function() {
    return React.DOM.div({
      className: 'lens-writer-wrapper'
    });
  }
});

ReactLensWriter.propTypes = {
  format: React.PropTypes.string,
  documentId: React.PropTypes.string,
  content: React.PropTypes.object,
  version: React.PropTypes.number
};

module.exports = ReactLensWriter;
