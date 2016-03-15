var React = require('react');
var LensWriter = require('lens/LensWriter');
var Component = require('substance/ui/Component');
var DocumentSession = require('substance/model/DocumentSession');
var $$ = Component.$$;
var LensArticleExporter = require('lens/model/LensArticleExporter');
var LensArticleImporter = require('lens/model/LensArticleImporter');

var exporter = new LensArticleExporter();
var importer = new LensArticleImporter();

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

  // New props arrived, update the editor
  componentDidUpdate: function() {
    var doc = this.createDoc(this.props.content);
    var documentSession = new DocumentSession(doc);

    this.writer.extendProps({
      documentSession: documentSession
    });
  },

  createDoc: function(xmlContent) {
    var doc = importer.importDocument(xmlContent);
    return doc;
  },

  componentDidMount: function() {
    var el = React.findDOMNode(this);
    var doc = this.createDoc(this.props.content);
    var documentSession = new DocumentSession(doc);

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
  content: React.PropTypes.string // XML source of the document
};

module.exports = ReactLensWriter;
