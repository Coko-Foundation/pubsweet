import React from 'react'
import styled from 'styled-components'

import Files from './Files'
import Attachment from '../atoms/Attachment'
import Icon from '../atoms/Icon'

// TODO: show upload progress

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--grid-unit);
`

const Paperclip = styled.span`
  margin-right: var(--sub-grid-unit);
`

const Filename = styled.span`
  color: var(--color-text);
`

const UploadingFile = ({ file, progress, error }) => (
  <Root>
    <Paperclip>
      <Icon color="var(--color-text)">paperclip</Icon>
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
