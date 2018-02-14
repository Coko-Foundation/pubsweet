import styled from 'styled-components'

const Title = styled.div`
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

/**
 * @component
 */
export default Title
