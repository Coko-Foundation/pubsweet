import React from 'react'
import { pascalize } from 'humps'
import * as icons from 'react-feather'
import styled from 'styled-components'

const Container = styled.span`
  display: inline-flex;
  padding: calc(${props => props.theme.subGridUnit} / 2);
  svg {
    stroke: ${props => props.color || props.theme.colorText};
    width: calc(${props => props.size} * ${props => props.theme.subGridUnit});
    height: calc(${props => props.size} * ${props => props.theme.subGridUnit});
  }
`

const Icon = ({ children, color, size = 3 }) => {
  // color = color || theme.colorText
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
