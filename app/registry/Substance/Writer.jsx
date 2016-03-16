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
    // let fragment = Object.assign(this.props.fragment, {
    //   source: content,
    //   presentation: content
    // })
    // this.props.save(fragment)
    // callback(null, content)
  }

  uploadFile (file, callback) {
    // return this.props.uploadFile(file, callback)
  }

  render () {
    let editor
    // let content

    if (this.props.document.data) {
      editor = <LensWriter
        docId={this.props.document.docId}
        version={this.props.document.version}
        content={this.props.document.data}
        onSave={this.save}
        format='json'
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
  document: React.PropTypes.object,
  save: React.PropTypes.func,
  uploadFile: React.PropTypes.func
}

export default Writer
