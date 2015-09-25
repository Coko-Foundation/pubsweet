var React = require('react')
var ReactPropTypes = React.PropTypes

var ScienceWriter = require("lens-writer")
var CrossrefSearch = require('lens-writer/lib/article/bib/crossref_search')
var NotificationService = require("lens-writer/app/notification_service")
var PaperStore = require("../stores/PaperStore");
var notifications = new NotificationService()

var Backend = {
  getDocument: function(paperId, cb) {
    var paper = PaperStore.getPaper(paperId);
    if (!paper) {
      return cb("No with id " + paperId);
    } else {
      cb(null, paper);
    }
  },

  saveDocument: function(doc, cb) {
    var id = doc.id;
    ScienceBloggerActions.savePaper(id);
    cb();
  },

  uploadFigure: function(file, cb) {
    var objectURL = window.URL.createObjectURL(file);
    cb(null, objectURL);
  }

}

export default class LensWriter extends React.Component {

  static childContextTypes = {
    backend: React.PropTypes.object,
    notifications: React.PropTypes.object,
    bibSearchEngines: React.PropTypes.array
  }

  getChildContext () {
    return {
      backend: Backend,
      bibSearchEngines: [new CrossrefSearch()],
      notifications: notifications,
    }
  }

  render () {
    return (
      <ScienceWriter
        documentId={this.props.paperId}
      />
    )
  }
}

Manage.propTypes = {
  paperId: React.PropTypes.object.isRequired
}
