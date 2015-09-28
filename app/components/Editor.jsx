var React = require('react')
var LensWriter = require('lens-writer')
var CrossrefSearch = require('lens-writer/lib/article/bib/crossref_search')
var NotificationService = require('lens-writer/app/notification_service')
var CreateStore = require('../stores/CreateStore')
var CreateActions = require('../actions/CreateActions')
var notifications = new NotificationService()

const Backend = {
  getDocument: function (id, cb) {
    var doc = CreateStore.creates.get(id)
    if (!doc) {
      return cb(`No document with id ${id}`)
    } else {
      cb(null, doc)
    }
  },

  saveDocument: function (doc, cb) {
    CreateActions.updateCreate(doc.id, doc)
    cb()
  },

  uploadFigure: function (file, cb) {
    var objectURL = window.URL.createObjectURL(file)
    cb(null, objectURL)
  }
}

export default class Editor extends React.Component {

  getChildContext () {
    return {
      backend: Backend,
      bibSearchEngines: [new CrossrefSearch()],
      notifications: notifications
    }
  }

  render () {
    return (
      <LensWriter documentId={this.props.createId} />
    )
  }
}

Editor.childContextTypes = {
  backend: React.PropTypes.object,
  notifications: React.PropTypes.object,
  bibSearchEngines: React.PropTypes.array
}

Editor.propTypes = {
  createId: React.PropTypes.object.isRequired
}
