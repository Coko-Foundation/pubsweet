import React from 'react'
import styled from 'styled-components'
import { Flexbox, UploadButton } from '../atoms'
import { Upload } from '../molecules'

const Root = styled.div``

class FileUploadList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files: props.files || [],
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
    const files = this.state.files.concat({
      name: file.name,
      url,
    })

    const uploads = this.state.uploads.filter(
      upload => upload.file.name !== upload.name,
    )

    this.setState({ files, uploads })

    this.props.onChange(files)
  }

  render() {
    const { name, buttonText, className, FileComponent } = this.props
    const { files, uploads } = this.state

    return (
      <Root className={className}>
        <UploadButton
          buttonText={buttonText}
          name={name}
          onChange={this.handleChange}
        />
        <Flexbox column>
          {uploads &&
            uploads.map(upload => (
              <Upload
                file={upload.file}
                handleUploadedFile={this.handleUploadedFile}
                key={upload.file.name}
                render={props => (
                  <FileComponent
                    file={props.file}
                    key={props.file.name}
                    {...props}
                  />
                )}
                request={upload.request}
              />
            ))}

          {files &&
            files.map(file => (
              <FileComponent file={file} key={file.name} uploaded />
            ))}
        </Flexbox>
      </Root>
    )
  }
}

export default FileUploadList
