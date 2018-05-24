import React from 'react'
import _ from 'lodash'
import * as icons from 'react-feather'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { th } from '@pubsweet/ui-toolkit'
import { Colorize } from '../atoms'

const Container = styled.span`
  display: inline-flex;
  padding: calc(${th('subGridUnit')} / 2);
  svg {
    stroke: ${props => props.color || props.theme.colorText};
    width: calc(${props => props.size} * ${th('subGridUnit')});
    height: calc(${props => props.size} * ${th('subGridUnit')});
  }
`

const Icon = ({ children, color, size = 3, ...props }) => {
  // convert `arrow_left` to `ArrowLeft`
  const name = _.upperFirst(_.camelCase(children))

  // select the icon
  const icon = icons[name]

  if (!icon) {
    console.warn("Icon '%s' not found", name)
  }

  return (
    <Container color={color} role="img" size={size} {...props}>
      {icon ? icon({}) : ''}
    </Container>
  )
}

Icon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

export default Colorize(Icon)
