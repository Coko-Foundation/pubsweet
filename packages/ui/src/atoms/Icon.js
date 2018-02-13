import React from 'react'
import { pascalize } from 'humps'
import * as icons from 'react-feather'
import styled from 'styled-components'

const Container = styled.span`
  display: inline-flex;
  padding: calc(var(--sub-grid-unit) / 2);
  svg {
    stroke: ${props => props.color};
    width: calc(${props => props.size} * var(--sub-grid-unit));
    height: calc(${props => props.size} * var(--sub-grid-unit));
  }
`

const Icon = ({ children, color = 'var(--color-text)', size = 3 }) => {
  // convert `arrow_left` to `ArrowLeft`
  const name = pascalize(children)

  // select the icon
  const icon = icons[name]

  if (!icon) {
    console.warn("Icon '%s' not found", name)
  }

  return (
    <Container color={color} size={size}>
      {icon ? icon({}) : ''}
    </Container>
  )
}

export default Icon
