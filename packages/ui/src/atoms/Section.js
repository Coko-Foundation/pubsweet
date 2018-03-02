import styled from 'styled-components'
import fromTheme from '../helpers/fromTheme'

const Section = styled.div`
  margin: 0 ${fromTheme('gridUnit')} ${fromTheme('gridUnit')} 0;

  &:not(:last-of-type) {
    margin-bottom: calc(${fromTheme('gridUnit')} * 2);
  }
`

/**
 * @component
 */
export default Section
