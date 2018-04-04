import React from 'react'
import { UploadingFile } from '../atoms'
import { FileUploadList } from '../molecules'

const Supplementary = props => (
  <FileUploadList
    {...props}
    buttonText="↑ Upload files"
    FileComponent={UploadingFile}
  />
)

export default Supplementary
