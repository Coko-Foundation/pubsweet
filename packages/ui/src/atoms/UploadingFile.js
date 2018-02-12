import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  background: var(--color-furniture);
  height: calc(var(--sub-grid-unit) * 15);
  margin-bottom: var(--sub-grid-unit);
  opacity: 0.5;
  position: relative;
  width: calc(var(--grid-unit) * 3);
`

const Progress = styled.div`
  color: var(--color-text-reverse);
  display: block;
  position: absolute;
  bottom: var(--sub-grid-unit);
  left: calc(var(--sub-grid-unit) * 4);
`

const Extension = styled.div`
  background: var(--color-text);
  color: var(--color-text-reverse);
  font-size: var(--font-size-base-small);
  left: calc(var(--sub-grid-unit) * 2);
  position: absolute;
  right: 0;
  text-align: center;
  text-transform: uppercase;
  top: calc(var(--sub-grid-unit) * 2);
`

const Filename = styled.div`
  color: var(--color-text);
  font-size: var(--font-size-base-small);
  font-style: italic;
  max-width: calc(var(--grid-unit) * 10);
`

const Uploading = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: var(--grid-unit);
  margin-right: calc(var(--sub-grid-unit) * 3);
  position: relative;
  width: calc(var(--grid-unit) * 10);
`

const Uploaded = Uploading.extend`
  &::before,
  &::after {
    cursor: pointer;
    transition: transform var(--transition-duration-s);
    font-size: var(--font-size-base-small);
    left: 65%;
    padding: 0 var(--sub-grid-unit) 0 var(--sub-grid-unit);
    position: absolute;
    border: var(--border-width) var(--border-style) var(--color-text-reverse);
    color: var(--color-text-reverse);
    text-transform: uppercase;
    cursor: pointer;
    transform: scaleX(0);
    transform-origin: 0 0;
  }

  &::after {
    background: var(--color-error);
    content: 'Remove';
    top: calc(var(--sub-grid-unit) * 5);
    z-index: 2;
  }

  &::before {
    background: var(--color-primary);
    content: 'Replace';
    top: calc(var(--sub-grid-unit) * 10);
    z-index: 3;
  }

  &:hover ${Extension} {
    background: var(--color-text-reverse);
    color: var(--color-primary);
  }

  &:hover ${Icon} {
    opacity: 1;
    background: var(--color-primary);
    transform: skewY(6deg) rotate(-6deg);
  }

  &:hover::after,
  &:hover::before {
    transform: scaleX(1);
  }
`

const ErrorWrapper = styled.div`
  background: var(--color-error);
  border: calc(var(--border-width) * 2) var(--border-style)
    var(--color-text-reverse);
  color: var(--color-text-reverse);
  font-size: var(--font-size-base-small);
  letter-spacing: 0.01em;
  opacity: 1;
  padding: var(--sub-grid-unit) var(--sub-grid-unit);
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
