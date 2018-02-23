import React from 'react'
import { pascalize } from 'humps'
import * as icons from 'react-feather'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Colorize from './Colorize'

const Container = styled.span`
  display: inline-flex;
  padding: calc(var(--sub-grid-unit) / 2);
  svg {
    stroke: ${props => props.color};
    width: calc(${props => props.size} * var(--sub-grid-unit));
    height: calc(${props => props.size} * var(--sub-grid-unit));
  }
`

const Icon = ({ children, color, size = 3, ...props }) => {
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

Icon.protoTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

export default Colorize(Icon)
