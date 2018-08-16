import React from 'react'
import styled from 'styled-components'
import { override, th } from '@pubsweet/ui-toolkit'

import { Icon2 } from '../atoms'

const AttachmentIcon = ({ uploaded, ...props }) => (
  <Icon2
    iconName="Paperclip"
    overrideName="@pubsweet.ui.Attachment"
    {...props}
  />
)

const StyledAttachmentIcon = styled(AttachmentIcon)`
  margin: 0 ${th('gridUnit')};
  height: ${th('fontSizeBase')};
  width: ${th('fontSizeBase')};
  stroke: ${props => (props.uploaded ? th('colorPrimary') : th('colorText'))};
  ${override('ui.Attachment')};
`

const Filename = styled.span`
  color: ${props => {
    if (props.error) return props.theme.colorError
    if (props.uploaded) return props.theme.colorPrimary
    return props.theme.colorTextPlaceholder
  }};
  display: inline-flex;
  overflow-wrap: break-word;
  padding: 0;
  word-break: break-all;
`

const Link = styled.a`
  align-items: center;
  display: flex;
  text-decoration: none;

  &:link:hover ${Filename} {
    text-decoration: underline;
  }
`

const Attachment = ({ file, error, uploaded }) => (
  <Link download={uploaded && file.name} href={uploaded && file.url}>
    <StyledAttachmentIcon uploaded={uploaded} />
    <Filename error={error} uploaded={uploaded}>
      {error || (uploaded ? file.name : 'Uploading...')}
    </Filename>
  </Link>
)

export default Attachment
