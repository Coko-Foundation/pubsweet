import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const Icon = styled.div`
  background: ${th('colorFurniture')};
  height: calc(${th('subGridUnit')} * 15);
  margin-bottom: ${th('subGridUnit')};
  opacity: 0.5;
  position: relative;
  width: calc(${th('gridUnit')} * 3);
`

const Progress = styled.div`
  color: ${th('colorTextReverse')};
  display: block;
  position: absolute;
  bottom: ${th('subGridUnit')};
  left: calc(${th('subGridUnit')} * 4);
`

const Extension = styled.div`
  background: ${th('colorText')};
  color: ${th('colorTextReverse')};
  font-size: ${th('fontSizeBaseSmall')};
  left: calc(${th('subGridUnit')} * 2);
  position: absolute;
  right: 0;
  text-align: center;
  text-transform: uppercase;
  top: calc(${th('subGridUnit')} * 2);
`

const Filename = styled.div`
  color: ${th('colorText')};
  font-size: ${th('fontSizeBaseSmall')};
  font-style: italic;
  max-width: calc(${th('gridUnit')} * 10);
`

const Uploading = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: ${th('gridUnit')};
  margin-right: calc(${th('subGridUnit')} * 3);
  position: relative;
  width: calc(${th('gridUnit')} * 10);
`

const Uploaded = Uploading.extend`
  &::before,
  &::after {
    cursor: pointer;
    transition: transform ${th('transitionDuration')};
    font-size: ${th('fontSizeBaseSmall')};
    left: 65%;
    padding: 0 ${th('subGridUnit')} 0 ${th('subGridUnit')};
    position: absolute;
    border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorTextReverse')};
    color: ${th('colorTextReverse')};
    text-transform: uppercase;
    cursor: pointer;
    transform: scaleX(0);
    transform-origin: 0 0;
  }

  &::after {
    background: ${th('colorError')};
    content: 'Remove';
    top: calc(${th('subGridUnit')} * 5);
    z-index: 2;
  }

  &::before {
    background: ${th('colorPrimary')};
    content: 'Replace';
    top: calc(${th('subGridUnit')} * 10);
    z-index: 3;
  }

  &:hover ${Extension} {
    background: ${th('colorTextReverse')};
    color: ${th('colorPrimary')};
  }

  &:hover ${Icon} {
    opacity: 1;
    background: ${th('colorPrimary')};
    transform: skewY(6deg) rotate(-6deg);
  }

  &:hover::after,
  &:hover::before {
    transform: scaleX(1);
  }
`

const ErrorWrapper = styled.div`
  background: ${th('colorError')};
  border: calc(${th('borderWidth')} * 2) ${th('borderStyle')}
    ${th('colorTextReverse')};
  color: ${th('colorTextReverse')};
  font-size: ${th('fontSizeBaseSmall')};
  letter-spacing: 0.01em;
  opacity: 1;
  padding: ${th('subGridUnit')} ${th('subGridUnit')};
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
