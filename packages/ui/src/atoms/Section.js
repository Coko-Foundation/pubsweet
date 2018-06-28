import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const Section = styled.div`
  margin: 0 calc(${th('gridUnit')} * 3) calc(${th('gridUnit')} * 3) 0;

  &:not(:last-of-type) {
    margin-bottom: calc(${th('gridUnit')} * 6);
  }

  ${override('ui.Section')};
`

/**
 * @component
 */
export default Section
