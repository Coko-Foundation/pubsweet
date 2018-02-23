import React from 'react'
import styled from 'styled-components'

import theme from '../helpers/theme'

const Heading = styled.span`
  color: ${theme.colorPrimary};
  font-size: ${({ level = 1, theme }) => theme[`fontSizeHeading${level}`]};
  font-family: ${theme.fontHeading};
  margin-bottom: calc(1 * ${theme.gridUnit});
`

export const H1 = ({ children }) => <Heading level={1}>{children}</Heading>
export const H2 = ({ children }) => <Heading level={2}>{children}</Heading>
export const H3 = ({ children }) => <Heading level={3}>{children}</Heading>
export const H4 = ({ children }) => <Heading level={4}>{children}</Heading>
export const H5 = ({ children }) => <Heading level={5}>{children}</Heading>
export const H6 = ({ children }) => <Heading level={6}>{children}</Heading>

/**
 * @component
 */
export default Heading
