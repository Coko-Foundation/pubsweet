import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  background: #ddd;
  height: 100px;
  padding: 5px;
  position: relative;
  transition: transform 0.3s ease;
  width: 70px;
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

const Filename = styled.div`
  color: #aaa;
  font-size: 1em;
  font-style: italic;
  margin: 0.7em;
  text-align: center;
  width: 20ch;
  word-break: break-all; /* to divide into lines */
`

const Root = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  margin-bottom: 2em;
  margin-right: 3em;
  position: relative;
  width: 20ch;

  &::before,
  &::after {
    cursor: pointer;
    transition: transform 0.3s;
  }

  &::after {
    background: var(--color-danger);
    border: 1px solid white;
    color: white;
    content: 'remove';
    cursor: pointer;
    font-size: 0.8em;
    left: 70%;
    letter-spacing: 0.5px;
    padding: 0.2em 0.4em;
    position: absolute;
    text-transform: uppercase;
    top: 4em;
    transform: scaleX(0);
    transform-origin: 0 0;
    z-index: 2;
  }

  &::before {
    background: var(--color-primary);
    border: 1px solid white;
    color: white;
    content: 'replace';
    cursor: pointer;
    font-size: 0.8em;
    left: 70%;
    letter-spacing: 0.5px;
    padding: 0.2em 0.4em;
    position: absolute;
    text-transform: uppercase;
    top: 6em;
    transform: scaleX(0);
    transform-origin: 0 0;
    z-index: 3;
  }

  &:hover {
    ${Extension} {
      background: white;
      border-right: 2px solid #ddd;
      color: var(--color-primary);
    }

    ${Icon} {
      background: var(--color-primary);
      transform: skewY(6deg) rotate(-6deg);
    }

    &::after,
    &::before {
      transform: scaleX(1);
    }
  }
`

const getFileExtension = ({ name }) => name.replace(/^.+\./, '')

const File = ({ value }) => (
  <Root>
    <Icon>
      <Extension>{getFileExtension(value)}</Extension>
    </Icon>

    <Filename>
      <a download={value.name} href={value.url}>
        {value.name}
      </a>
    </Filename>
  </Root>
)

export default File
