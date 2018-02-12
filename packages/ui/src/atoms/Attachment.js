import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const Filename = styled.span`
  color: ${props =>
    props.uploaded ? 'var(--color-primary)' : 'var(--color-secondary)'};
  display: inline-flex;
  overflow-wrap: break-word;
  padding: 0;
  word-break: break-all;
`
const uploadedIcon = `
  stroke: var(--color-primary);
  height: var(--font-size-base-small);
  width: var(--font-size-base-small);
`

const uploadingIcon = `
  stroke: var(--color-text);
  height: var(--font-size-base);
  width: var(--font-size-base);
`
const IconContainer = styled.span`
  margin: 0 var(--sub-grid-unit);

  & svg {
    ${props => (props.uploaded ? uploadedIcon : uploadingIcon)};
  }
`

const Root = styled.a`
  align-items: center;
  display: flex;
  text-decoration: none;

  &:hover ${Filename} {
    ${props => props.uploaded && 'text-decoration: underline;'}
`

const Attachment = ({ file, error, uploaded }) => (
  <Root download={uploaded && file.name} href={uploaded && file.url}>
    <IconContainer uploaded={uploaded}>
      <Icon>paperclip</Icon>
    </IconContainer>
    <Filename uploaded={uploaded}>
      {error || (uploaded ? file.name : 'Uploading...')}
    </Filename>
  </Root>
)

export default Attachment
