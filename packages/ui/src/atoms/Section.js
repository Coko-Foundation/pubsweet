import styled from 'styled-components'

const Section = styled.div`
  margin: 0 var(--grid-unit) var(--grid-unit) 0;

  &:not(:last-of-type) {
    margin-bottom: calc(var(--grid-unit) * 2);
  }
`

/**
 * @component
 */
export default Section
