import styled from 'styled-components'

const Section = styled.div`
  margin: 0 ${props => props.theme.gridUnit} ${props => props.theme.gridUnit} 0;

  &:not(:last-of-type) {
    margin-bottom: calc(${props => props.theme.gridUnit} * 2);
  }
`

/**
 * @component
 */
export default Section
