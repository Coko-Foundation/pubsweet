import React from 'react'

import { Attachment } from '../atoms'
import { FileUploadList } from '../molecules'

// TODO: show upload progress

const Attachments = props => (
  <FileUploadList
    {...props}
    buttonText="Attach file"
    className={props.className}
    FileComponent={Attachment}
  />
)

export default Attachments
