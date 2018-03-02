import React from 'react'
import styled from 'styled-components'

import th from '../helpers/themeHelper'

const Heading = styled.span`
  color: ${th('colorPrimary')};
  font-size: ${({ level = 1, theme }) => theme[`fontSizeHeading${level}`]};
  font-family: ${th('fontHeading')};
  margin-bottom: calc(1 * ${th('gridUnit')});
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
