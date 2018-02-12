import React from 'react'
import FileUploadList from './FileUploadList'
import UploadingFile from '../atoms/UploadingFile'

const Supplementary = props => (
  <FileUploadList
    {...props}
    buttonText="↑ Upload files"
    FileComponent={UploadingFile}
  />
)

export default Supplementary
