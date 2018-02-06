import React from 'react'
import styled from 'styled-components'

// TODO: cancel button

const Root = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 2em;
  margin-right: 3em;
  position: relative;
  width: 20ch;
`

const ErrorWrapper = styled.div`
  background: var(--color-danger);
  border: 2px solid white;
  color: white;
  font-size: 0.8em;
  letter-spacing: 0.01em;
  opacity: 1;
  padding: 0.3em 0.5em;
  position: absolute;
  top: 25%;
  z-index: 4;
`

const Icon = styled.div`
  background: #ddd;
  height: 100px;
  margin: 5px;
  opacity: 0.5;
  position: relative;
  width: 70px;
`

const Progress = styled.div`
  background-image:
    linear-gradient(
      var(--color-primary-light) 50%,
      var(--color-primary) 75%,
      to top
    );
  bottom: 0;
  content: '';
  display: block;
  left: 0;
  opacity: 1;
  position: absolute;
  right: 0;
  transform-origin: 0 0;

  &::after {
    /* we can use a data attribute for the numbering below */
    bottom: 2px;
    color: white;
    content: '${props => props.percent}%';
    display: block;
    position: absolute;
    right: 2px;
  }
`

const Filename = styled.div`
  color: gray;
  font-size: 90%;
  font-style: italic;
  margin: 5px;
  max-width: 20ch;
`
const Extension = styled.div`
  background: #888;
  color: white;
  font-size: 12px;
  left: 20px;
  padding: 2px;
  position: absolute;
  right: 0;
  text-align: center;
  text-transform: uppercase;
  top: 20px;
`
const extension = ({ name }) => name.replace(/^.+\./, '')

const UploadingFile = ({ file, error, progress }) => (
  <Root>
    {!!error && <ErrorWrapper>{error}</ErrorWrapper>}
    <Icon>
      {!!progress && <Progress percent={progress * 100} />}
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
