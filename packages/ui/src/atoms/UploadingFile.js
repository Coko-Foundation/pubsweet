import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  background: ${props => props.theme.colorFurniture};
  height: calc(${props => props.theme.subGridUnit} * 15);
  margin-bottom: ${props => props.theme.subGridUnit};
  opacity: 0.5;
  position: relative;
  width: calc(${props => props.theme.gridUnit} * 3);
`

const Progress = styled.div`
  color: ${props => props.theme.colorTextReverse};
  display: block;
  position: absolute;
  bottom: ${props => props.theme.subGridUnit};
  left: calc(${props => props.theme.subGridUnit} * 4);
`

const Extension = styled.div`
  background: ${props => props.theme.colorText};
  color: ${props => props.theme.colorTextReverse};
  font-size: ${props => props.theme.fontSizeBaseSmall};
  left: calc(${props => props.theme.subGridUnit} * 2);
  position: absolute;
  right: 0;
  text-align: center;
  text-transform: uppercase;
  top: calc(${props => props.theme.subGridUnit} * 2);
`

const Filename = styled.div`
  color: ${props => props.theme.colorText};
  font-size: ${props => props.theme.fontSizeBaseSmall};
  font-style: italic;
  max-width: calc(${props => props.theme.gridUnit} * 10);
`

const Uploading = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.gridUnit};
  margin-right: calc(${props => props.theme.subGridUnit} * 3);
  position: relative;
  width: calc(${props => props.theme.gridUnit} * 10);
`

const Uploaded = Uploading.extend`
  &::before,
  &::after {
    cursor: pointer;
    transition: transform ${props => props.theme.transitionDurationS};
    font-size: ${props => props.theme.fontSizeBaseSmall};
    left: 65%;
    padding: 0 ${props => props.theme.subGridUnit} 0
      ${props => props.theme.subGridUnit};
    position: absolute;
    border: ${props => props.theme.borderWidth}
      ${props => props.theme.borderStyle}
      ${props => props.theme.colorTextReverse};
    color: ${props => props.theme.colorTextReverse};
    text-transform: uppercase;
    cursor: pointer;
    transform: scaleX(0);
    transform-origin: 0 0;
  }

  &::after {
    background: ${props => props.theme.colorError};
    content: 'Remove';
    top: calc(${props => props.theme.subGridUnit} * 5);
    z-index: 2;
  }

  &::before {
    background: ${props => props.theme.colorPrimary};
    content: 'Replace';
    top: calc(${props => props.theme.subGridUnit} * 10);
    z-index: 3;
  }

  &:hover ${Extension} {
    background: ${props => props.theme.colorTextReverse};
    color: ${props => props.theme.colorPrimary};
  }

  &:hover ${Icon} {
    opacity: 1;
    background: ${props => props.theme.colorPrimary};
    transform: skewY(6deg) rotate(-6deg);
  }

  &:hover::after,
  &:hover::before {
    transform: scaleX(1);
  }
`

const ErrorWrapper = styled.div`
  background: ${props => props.theme.colorError};
  border: calc(${props => props.theme.borderWidth} * 2)
    ${props => props.theme.borderStyle} ${props => props.theme.colorTextReverse};
  color: ${props => props.theme.colorTextReverse};
  font-size: ${props => props.theme.fontSizeBaseSmall};
  letter-spacing: 0.01em;
  opacity: 1;
  padding: ${props => props.theme.subGridUnit}
    ${props => props.theme.subGridUnit};
  position: absolute;
  top: 25%;
  z-index: 4;
`

const getFileExtension = ({ name }) => name.replace(/^.+\./, '')

const UploadingFile = ({ file, progress, error, uploaded }) => {
  const Root = uploaded ? Uploaded : Uploading

  return (
    <Root>
      {!!error && <ErrorWrapper>{error}</ErrorWrapper>}
      <Icon>
        {!!progress && <Progress>{progress * 100}%</Progress>}
        <Extension>{getFileExtension(file)}</Extension>
      </Icon>
      <Filename>
        {uploaded ? (
          <a download={file.name} href={file.url}>
            {file.name}
          </a>
        ) : (
          file.name
        )}
      </Filename>
    </Root>
  )
}

export default UploadingFile
