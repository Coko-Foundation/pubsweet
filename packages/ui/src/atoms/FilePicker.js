import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FilePicker extends Component {
  static propTypes = {
    /** Status of the FilePicker. When disabled no files can be uploaded. */
    disabled: PropTypes.bool,
    /** Allowed files to be uploaded. */
    allowedFileExtensions: PropTypes.arrayOf(PropTypes.string),
    /** Function called with the uploaded file. */
    onUpload: PropTypes.func.isRequired,
  }

  static defaultProps = {
    disabled: false,
    allowedFileExtensions: [],
  }

  handleUpload = e => {
    const { onUpload } = this.props

    onUpload(e.target.files[0])
    this.fileInput.value = null
  }

  getAllowedTypes = () => {
    const { allowedFileExtensions } = this.props

    if (!allowedFileExtensions) {
      return []
    }

    return allowedFileExtensions.map(ext => `.${ext}`)
  }

  render() {
    const { children, disabled } = this.props
    return (
      <div>
        <input
          accept={this.getAllowedTypes()}
          onChange={this.handleUpload}
          ref={input => (this.fileInput = input)}
          style={{ display: 'none' }}
          type="file"
        />
        {React.cloneElement(children, {
          onClick: e => {
            e.preventDefault()
            !disabled && this.fileInput.click()
          },
        })}
      </div>
    )
  }
}

export default FilePicker
