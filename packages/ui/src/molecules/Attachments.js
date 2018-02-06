import React from 'react'
import styled from 'styled-components'

import Files from './Files'
import Attachment from '../atoms/Attachment'
import Icon from '../atoms/Icon'

// TODO: show upload progress

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  margin-top: 2em;
`

const Paperclip = styled.span`
  color: gray;
  margin-right: 10px;
`

const Filename = styled.span`
  color: gray;
`

const UploadingFile = ({ file, progress, error }) => (
  <Root>
    <Paperclip>
      <Icon color="var(--color-local, black)">paperclip</Icon>
    </Paperclip>
    <Filename>{error || 'Uploading…'}</Filename>
  </Root>
)

const Attachments = props => (
  <Files
    {...props}
    buttonText="Attach file"
    uploadedFile={value => <Attachment key={value.url} value={value} />}
    uploadingFile={UploadingFile}
  />
)

export default Attachments
