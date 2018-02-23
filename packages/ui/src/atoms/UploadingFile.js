import React from 'react'
import styled from 'styled-components'
import theme from '../helpers/theme'

const Icon = styled.div`
  background: ${theme.colorFurniture};
  height: calc(${theme.subGridUnit} * 15);
  margin-bottom: ${theme.subGridUnit};
  opacity: 0.5;
  position: relative;
  width: calc(${theme.gridUnit} * 3);
`

const Progress = styled.div`
  color: ${theme.colorTextReverse};
  display: block;
  position: absolute;
  bottom: ${theme.subGridUnit};
  left: calc(${theme.subGridUnit} * 4);
`

const Extension = styled.div`
  background: ${theme.colorText};
  color: ${theme.colorTextReverse};
  font-size: ${theme.fontSizeBaseSmall};
  left: calc(${theme.subGridUnit} * 2);
  position: absolute;
  right: 0;
  text-align: center;
  text-transform: uppercase;
  top: calc(${theme.subGridUnit} * 2);
`

const Filename = styled.div`
  color: ${theme.colorText};
  font-size: ${theme.fontSizeBaseSmall};
  font-style: italic;
  max-width: calc(${theme.gridUnit} * 10);
`

const Uploading = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: ${theme.gridUnit};
  margin-right: calc(${theme.subGridUnit} * 3);
  position: relative;
  width: calc(${theme.gridUnit} * 10);
`

const Uploaded = Uploading.extend`
  &::before,
  &::after {
    cursor: pointer;
    transition: transform ${theme.transitionDurationS};
    font-size: ${theme.fontSizeBaseSmall};
    left: 65%;
    padding: 0 ${theme.subGridUnit} 0 ${theme.subGridUnit};
    position: absolute;
    border: ${theme.borderWidth} ${theme.borderStyle} ${theme.colorTextReverse};
    color: ${theme.colorTextReverse};
    text-transform: uppercase;
    cursor: pointer;
    transform: scaleX(0);
    transform-origin: 0 0;
  }

  &::after {
    background: ${theme.colorError};
    content: 'Remove';
    top: calc(${theme.subGridUnit} * 5);
    z-index: 2;
  }

  &::before {
    background: ${theme.colorPrimary};
    content: 'Replace';
    top: calc(${theme.subGridUnit} * 10);
    z-index: 3;
  }

  &:hover ${Extension} {
    background: ${theme.colorTextReverse};
    color: ${theme.colorPrimary};
  }

  &:hover ${Icon} {
    opacity: 1;
    background: ${theme.colorPrimary};
    transform: skewY(6deg) rotate(-6deg);
  }

  &:hover::after,
  &:hover::before {
    transform: scaleX(1);
  }
`

const ErrorWrapper = styled.div`
  background: ${theme.colorError};
  border: calc(${theme.borderWidth} * 2) ${theme.borderStyle}
    ${theme.colorTextReverse};
  color: ${theme.colorTextReverse};
  font-size: ${theme.fontSizeBaseSmall};
  letter-spacing: 0.01em;
  opacity: 1;
  padding: ${theme.subGridUnit} ${theme.subGridUnit};
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
