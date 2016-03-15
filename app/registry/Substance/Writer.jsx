import React from 'react'
import LensWriter from './ReactLensWriter'

// Styles
import './styles/writer.scss'

class Writer extends React.Component {
  constructor (props) {
    super(props)
    this.save = this.save.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }

  save (content, callback) {
    let fragment = Object.assign(this.props.fragment, {
      source: content,
      presentation: content
    })
    this.props.save(fragment)
    callback(null, content)
  }

  uploadFile (file, callback) {
    return this.props.uploadFile(file, callback)
  }

  render () {
    let editor
    let content
    if (this.props.fragment) {
      if (this.props.fragment.source === '') {
        content = '<article xmlns="http://substance.io/science-article/0.1.0" lang="en"><meta><title>' +
        this.props.fragment.title + '</title><abstract>hello</abstract></meta><resources></resources>' +
        '<body><p id="p1">test</p></body></article>'
      } else {
        content = this.props.fragment.source
      }

      editor = <LensWriter
        content={content}
        onSave={this.save}
        onUploadFile={this.uploadFile}
      />
    } else {
      editor = <p>Loading</p>
    }

    return (
      <div>{editor}</div>
    )
  }
}

Writer.propTypes = {
  fragment: React.PropTypes.object,
  save: React.PropTypes.func,
  uploadFile: React.PropTypes.func
}

export default Writer
