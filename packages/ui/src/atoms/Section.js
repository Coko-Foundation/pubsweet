import styled from 'styled-components'
import th from '../helpers/themeHelper'

const Section = styled.div`
  margin: 0 ${th('gridUnit')} ${th('gridUnit')} 0;

  &:not(:last-of-type) {
    margin-bottom: calc(${th('gridUnit')} * 2);
  }
`

/**
 * @component
 */
export default Section
