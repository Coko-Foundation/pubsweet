import React from 'react'
import styled, { css } from 'styled-components'
import invariant from 'invariant'
import { th, override } from '@pubsweet/ui-toolkit'

const style = css`
  color: ${th('colorPrimary')};
  font-size: ${({ level = 1, theme }) => theme[`fontSizeHeading${level}`]};
  font-family: ${th('fontHeading')};
  line-height: ${({ level = 1, theme }) => theme[`lineHeightHeading${level}`]};
  ${override('ui.Heading')};
`

export const H1 = styled.h1.attrs(() => ({ level: 1 }))`
  ${style};
  ${override('ui.H1')};
`
export const H2 = styled.h2.attrs(() => ({ level: 2 }))`
  ${style};
  ${override('ui.H2')};
`
export const H3 = styled.h3.attrs(() => ({ level: 3 }))`
  ${style};
  ${override('ui.H3')};
`
export const H4 = styled.h4.attrs(() => ({ level: 4 }))`
  ${style};
  ${override('ui.H4')};
`
export const H5 = styled.h5.attrs(() => ({ level: 5 }))`
  ${style};
  ${override('ui.H5')};
`
export const H6 = styled.h6.attrs(() => ({ level: 6 }))`
  ${style};
  ${override('ui.H6')};
`

const componentMap = [null, H1, H2, H3, H4, H5, H6]
const Heading = ({ level, ...props }) => {
  invariant(level > 0 && level < 7, 'level must be between 1 and 6')
  const Component = componentMap[level]
  return <Component {...props} />
}

/** @component */
export default Heading
