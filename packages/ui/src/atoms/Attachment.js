import React from 'react'
import styled from 'styled-components'
import th from '../helpers/themeHelper'
import Icon from './Icon'

const Filename = styled.span`
  color: ${props =>
    props.uploaded ? props.theme.colorPrimary : props.theme.colorSecondary};
  display: inline-flex;
  overflow-wrap: break-word;
  padding: 0;
  word-break: break-all;
`

const uploadedIcon = ({ theme }) => `
  stroke: ${th('colorPrimary')};
  height: ${th('fontSizeBaseSmall')};
  width: ${th('fontSizeBaseSmall')};
`

const uploadingIcon = ({ theme }) => `
  stroke: ${th('colorText')};
  height: ${th('fontSizeBase')};
  width: ${th('fontSizeBase')};
`

const IconContainer = styled.span`
  margin: 0 ${th('subGridUnit')};

  & svg {
    ${props => (props.uploaded ? uploadedIcon : uploadingIcon)};
  }
`

const Root = styled.a`
  align-items: center;
  display: flex;
  text-decoration: none;

  &:hover ${Filename} {
    text-decoration: ${props => (props.uploaded ? 'underline' : 'none')};
  }
`

const Attachment = ({ file, error, uploaded }) => (
  <Root
    download={uploaded && file.name}
    href={uploaded && file.url}
    uploaded={uploaded}
  >
    <IconContainer uploaded={uploaded}>
      <Icon>paperclip</Icon>
    </IconContainer>
    <Filename uploaded={uploaded}>
      {error || (uploaded ? file.name : 'Uploading...')}
    </Filename>
  </Root>
)

export default Attachment
