import React from 'react'

import { Attachment } from '../atoms'
import { FileUploadList } from '../molecules'

// TODO: show upload progress

const Attachments = props => (
  <FileUploadList
    {...props}
    buttonText="Attach file"
    FileComponent={Attachment}
  />
)

export default Attachments
