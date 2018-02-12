import React from 'react'

import FileUploadList from './FileUploadList'
import Attachment from '../atoms/Attachment'

// TODO: show upload progress

const Attachments = props => (
  <FileUploadList
    {...props}
    buttonText="Attach file"
    FileComponent={Attachment}
  />
)

export default Attachments
