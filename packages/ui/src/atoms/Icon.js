import React from 'react'
import { pascalize } from 'humps'
import * as icons from 'react-feather'
import styled from 'styled-components'

const Container = styled.span`
  display: inline-flex;
  width: var(--icon-size);
`

const Icon = ({ children, color = 'var(--color-local, black)', size = 24 }) => {
  // convert `arrow_left` to `ArrowLeft`
  const name = pascalize(children)

  // select the icon
  const icon = icons[name]

  return <Container>{icon({ color, size })}</Container>
}

export default Icon
