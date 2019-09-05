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
      <React.Fragment>
        <input
          accept={this.getAllowedTypes()}
          disabled={disabled}
          onChange={this.handleUpload}
          ref={input => (this.fileInput = input)}
          style={{ display: 'none' }}
          type="file"
        />
        {React.cloneElement(React.Children.only(children), {
          tabIndex: disabled ? undefined : 0,
          onKeyPress: e => {
            e.preventDefault()
            if (['Enter', ' '].includes(e.key)) this.fileInput.click()
          },
          onClick: e => {
            e.preventDefault()
            this.fileInput.click()
          },
          role: 'button',
        })}
      </React.Fragment>
    )
  }
}

export default FilePicker
