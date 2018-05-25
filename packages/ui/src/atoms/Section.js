import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

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
