import React from 'react'
import styled from 'styled-components'
import fromTheme from '../helpers/fromTheme'

const Icon = styled.div`
  background: ${fromTheme.colorFurniture};
  height: calc(${fromTheme.subGridUnit} * 15);
  margin-bottom: ${fromTheme.subGridUnit};
  opacity: 0.5;
  position: relative;
  width: calc(${fromTheme.gridUnit} * 3);
`

const Progress = styled.div`
  color: ${fromTheme.colorTextReverse};
  display: block;
  position: absolute;
  bottom: ${fromTheme.subGridUnit};
  left: calc(${fromTheme.subGridUnit} * 4);
`

const Extension = styled.div`
  background: ${fromTheme.colorText};
  color: ${fromTheme.colorTextReverse};
  font-size: ${fromTheme.fontSizeBaseSmall};
  left: calc(${fromTheme.subGridUnit} * 2);
  position: absolute;
  right: 0;
  text-align: center;
  text-transform: uppercase;
  top: calc(${fromTheme.subGridUnit} * 2);
`

const Filename = styled.div`
  color: ${fromTheme.colorText};
  font-size: ${fromTheme.fontSizeBaseSmall};
  font-style: italic;
  max-width: calc(${fromTheme.gridUnit} * 10);
`

const Uploading = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: ${fromTheme.gridUnit};
  margin-right: calc(${fromTheme.subGridUnit} * 3);
  position: relative;
  width: calc(${fromTheme.gridUnit} * 10);
`

const Uploaded = Uploading.extend`
  &::before,
  &::after {
    cursor: pointer;
    transition: transform ${fromTheme.transitionDurationS};
    font-size: ${fromTheme.fontSizeBaseSmall};
    left: 65%;
    padding: 0 ${fromTheme.subGridUnit} 0 ${fromTheme.subGridUnit};
    position: absolute;
    border: ${fromTheme.borderWidth} ${fromTheme.borderStyle}
      ${fromTheme.colorTextReverse};
    color: ${fromTheme.colorTextReverse};
    text-transform: uppercase;
    cursor: pointer;
    transform: scaleX(0);
    transform-origin: 0 0;
  }

  &::after {
    background: ${fromTheme.colorError};
    content: 'Remove';
    top: calc(${fromTheme.subGridUnit} * 5);
    z-index: 2;
  }

  &::before {
    background: ${fromTheme.colorPrimary};
    content: 'Replace';
    top: calc(${fromTheme.subGridUnit} * 10);
    z-index: 3;
  }

  &:hover ${Extension} {
    background: ${fromTheme.colorTextReverse};
    color: ${fromTheme.colorPrimary};
  }

  &:hover ${Icon} {
    opacity: 1;
    background: ${fromTheme.colorPrimary};
    transform: skewY(6deg) rotate(-6deg);
  }

  &:hover::after,
  &:hover::before {
    transform: scaleX(1);
  }
`

const ErrorWrapper = styled.div`
  background: ${fromTheme.colorError};
  border: calc(${fromTheme.borderWidth} * 2) ${fromTheme.borderStyle}
    ${fromTheme.colorTextReverse};
  color: ${fromTheme.colorTextReverse};
  font-size: ${fromTheme.fontSizeBaseSmall};
  letter-spacing: 0.01em;
  opacity: 1;
  padding: ${fromTheme.subGridUnit} ${fromTheme.subGridUnit};
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
