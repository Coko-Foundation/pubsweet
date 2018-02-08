import React from 'react'
import { Icon } from '@pubsweet/ui'
import styled, { keyframes } from 'styled-components'

const Spinner = ({ icon = 'loader', size = 16, color = '#444' }) => (
  <Root>
    <Icon color={color} size={size}>
      {icon}
    </Icon>
  </Root>
)

const rotating = keyframes`
  from {
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`

const Root = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  animation: ${rotating} 1.5s linear infinite;
`

export default Spinner
