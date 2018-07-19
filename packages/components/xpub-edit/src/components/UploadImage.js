import React from 'react'
import styled from 'styled-components'
import { Attachments } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

const AttachmentsStyled = styled(Attachments)`
  display: inline-flex;
  &:hover {
    border-bottom: 2px solid ${th('colorPrimary')};
  }
  button {
    border: none;
    color: #777;
    margin-bottom: 0;
    &:hover {
      color: ${th('colorPrimary')};
    }
  }
`
const UploadImage = ({ item, state, handle, fileUpload }) => (
  <AttachmentsStyled files={[]} uploadFile={fileUpload} />
)
export default UploadImage
