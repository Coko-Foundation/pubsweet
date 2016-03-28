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

  save (source, callback) {
    let doc = Object.assign(this.props.fragment, {
      source: source
    })
    this.props.save(doc)
    callback(null, source)
  }

  uploadFile (file, callback) {
    return this.props.uploadFile(file, callback)
  }

  render () {
    return <LensWriter
      documentId={this.props.fragment._id}
      version={this.props.fragment.version}
      content={this.props.fragment.source}
      onSave={this.save}
      format='json'
      onUploadFile={this.uploadFile}
      />
  }
}

Writer.propTypes = {
  fragment: React.PropTypes.object,
  save: React.PropTypes.func,
  uploadFile: React.PropTypes.func
}

export default Writer
