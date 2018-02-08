import React from 'react'
import styled from 'styled-components'

// TODO: cancel button

const Root = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: var(--grid-unit);
  margin-right: calc(var(--sub-grid-unit) * 3);
  position: relative;
  width: calc(var(--grid-unit) * 10);
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

const Icon = styled.div`
  background: var(--color-furniture);
  height: calc(var(--grid-unit) * 3);
  margin: 0 var(--sub-grid-unit) var(--sub-grid-unit) var(--sub-grid-unit);
  opacity: 0.5;
  position: relative;
  width: calc(var(--grid-unit) * 2);
`

const Progress = styled.div`
  color: var(--color-text-reverse);
  display: block;
  position: absolute;
  bottom: var(--sub-grid-unit);
  left: calc(var(--sub-grid-unit) * 2);
`

const Filename = styled.div`
  color: var(--color-text);
  font-size: var(--font-size-base-small);
  font-style: italic;
  margin: 0 var(--sub-grid-unit) var(--sub-grid-unit) var(--sub-grid-unit);
  max-width: calc(var(--grid-unit) * 10);
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
const extension = ({ name }) => name.replace(/^.+\./, '')

const UploadingFile = ({ file, error, progress }) => (
  <Root>
    {!!error && <ErrorWrapper>{error}</ErrorWrapper>}
    <Icon>
      {!!progress && <Progress>{progress * 100}%</Progress>}
      <Extension>{extension(file)}</Extension>
    </Icon>
    <Filename>{file.name}</Filename>
  </Root>
)

export default UploadingFile

// clock experiment, on hold.
// const Progress = styled.div`
//    opacity: 1;
//    background: var(--color-primary);
//    position: absolute;
//    bottom: 10%;
//    right: 10%;
//    content: '';
//    width: 3px;
//    height: 1em;
//    display: block;
//    // margin-left: 30%;
//    transform-origin: 0 0;
//    animation: rotate 1s infinite ease-in-out ;
//    background-image:
//    &:after {
//      content: "uploading";
//      display: block;
//      position: absolute;
//      width: 1em;
//      height:  1em;
//    }
//
//  @keyframes rotate {
//    0% {
//      transform: rotate(0)
//    }
//    100% {
//      transform: rotate(360deg);
//    }
// `
