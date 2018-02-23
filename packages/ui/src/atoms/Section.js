import styled from 'styled-components'
import theme from '../helpers/theme'

const Section = styled.div`
  margin: 0 ${theme.gridUnit} ${theme.gridUnit} 0;

  &:not(:last-of-type) {
    margin-bottom: calc(${theme.gridUnit} * 2);
  }
`

/**
 * @component
 */
export default Section
