import React from 'react'
import LensWriter from 'lens-writer'
import CrossrefSearch from 'lens-writer/lib/article/bib/crossref_search'
import NotificationService from 'lens-writer/app/notification_service'
import Article from 'lens-writer/lib/article/article'

// Styles
import 'lens-writer/app/app.scss'
import 'scss/components/_substanceEditor'

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
        try {
          callback(null, Article.fromHtml(this.state.value))
        } catch (e) {
          callback(null, Article.fromXml(Article.ARTICLE_XML_TEMPLATE))
        }
      }.bind(this),
      saveDocument: function (doc, callback) {
        const html = doc.toHtml()
        this.setState({value: html})
        this.props.onChange(html)
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
      <LensWriter documentId='test' />
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
