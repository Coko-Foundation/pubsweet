import React from 'react'
import styled from 'styled-components'
import Upload from './Upload'

const Root = styled.div``
const Uploader = styled.div``

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-small);
  font-style: italic;
`

const AttachButton = styled.button.attrs({
  type: 'button',
})`
  background: transparent;
  border: var(--border-width) dashed var(--color-border);
  height: var(--grid-unit);
  cursor: pointer;
  margin-bottom: var(--grid-unit);
  padding: var(--sub-grid-unit);
`

class Files extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      values: props.value || [],
      uploads: [],
    }
  }

  handleClick = () => {
    this.fileInput.click()
  }

  handleChange = event => {
    const { uploads } = this.state

    Array.from(event.target.files).forEach(file => {
      uploads.push({
        file,
        request: this.props.uploadFile(file),
      })
    })

    this.setState({ uploads })
  }

  handleUploadedFile = ({ file, url }) => {
    const values = this.state.values.concat({
      name: file.name,
      url,
    })

    const uploads = this.state.uploads.filter(
      item => item.file.name !== file.name,
    )

    this.setState({ values, uploads })

    this.props.onChange(values)
  }

  render() {
    const { name, buttonText, uploadingFile, uploadedFile } = this.props
    const { values, uploads } = this.state

    return (
      <Root>
        <Uploader>
          <AttachButton onClick={() => this.fileInput.click()}>
            {buttonText}
          </AttachButton>

          <input
            multiple
            name={name}
            onChange={this.handleChange}
            ref={input => (this.fileInput = input)}
            style={{ display: 'none' }}
            type="file"
          />
        </Uploader>

        <FileList>
          {uploads &&
            uploads.map(upload => (
              <Upload
                file={upload.file}
                handleUploadedFile={this.handleUploadedFile}
                key={upload.file.name}
                render={uploadingFile}
                request={upload.request}
              />
            ))}

          {values && values.map(uploadedFile)}
        </FileList>
      </Root>
    )
  }
}

export default Files
