import React from 'react'
import styled from 'styled-components'

const Heading = styled.span`
  color: var(--color-primary);
  font-size: ${({ level = 1 }) =>
    ({
      1: 'var(--font-size-heading-1)',
      2: 'var(--font-size-heading-2)',
      3: 'var(--font-size-heading-3)',
      4: 'var(--font-size-heading-4)',
      5: 'var(--font-size-heading-5)',
      6: 'var(--font-size-heading-6)',
    }[level])};
  font-family: var(--font-heading);
  margin-bottom: calc(1 * var(--grid-unit));
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
