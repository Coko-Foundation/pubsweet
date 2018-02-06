import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const Filename = styled.span`
  color: var(--color-primary);
  display: inline-flex;
  overflow-wrap: break-word;
  padding: 0;
  word-break: break-all;
`

const IconContainer = styled.span`
  --color-local: var(--color-primary);
  --icon-size: 16px;

  margin: 0.5em;

  & svg {
    height: var(--icon-size);
    width: var(--icon-size);
  }
`

const Root = styled.a`
  align-items: center;
  display: flex;
  line-height: 1.15;
  text-decoration: none;

  &:hover ${Filename} {
    text-decoration: underline;
  }
`

const Attachment = ({ value }) => (
  <Root download={value.name} href={value.url}>
    <IconContainer>
      <Icon color="var(--color-local)">paperclip</Icon>
    </IconContainer>
    <Filename>{value.name}</Filename>
  </Root>
)

export default Attachment
