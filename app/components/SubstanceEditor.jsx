import React from 'react'
import LensWriter from 'lens-writer'
import CrossrefSearch from 'lens-writer/lib/article/bib/crossref_search'
import NotificationService from 'lens-writer/app/notification_service'

import 'scss/components/_editor'

const notifications = new NotificationService()

export default class SubstanceEditor extends React.Component {
  constructor (props) {
    super(props)
    this._onChange = this._onChange.bind(this)
    this.backend = this.backend.bind(this)
    this.getChildContext = this.getChildContext.bind(this)

    this.state = {
      value: this.props.value || ''
    }
  }

  getChildContext () {
    return {
      backend: this.backend(),
      bibSearchEngines: [new CrossrefSearch()],
      notifications: notifications
    }
  }

  backend () {
    return {
      getDocument: function (id, callback) {
        callback(null, this.state.value)
      }.bind(this),
      saveDocument: function (value, callback) {
        this.setState({value: value})
        this.props.onChange(value)
        callback()
      }.bind(this),
      uploadFigure: function (file, callback) {
        var objectURL = window.URL.createObjectURL(file)
        callback(null, objectURL)
      }
    }
  }

  _onChange (value) {
    this.setState({value: value})
    this.props.onChange(value)
  }

  render () {
    return (
      <LensWriter documentId='' />
    )
  }
}

SubstanceEditor.childContextTypes = {
  backend: React.PropTypes.object,
  notifications: React.PropTypes.object,
  bibSearchEngines: React.PropTypes.array
}

SubstanceEditor.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
}
