import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const Section = styled.div`
  margin: 0 ${th('gridUnit')} ${th('gridUnit')} 0;

  &:not(:last-of-type) {
    margin-bottom: calc(${th('gridUnit')} * 2);
  }

  ${override('ui.Section')};
`

/**
 * @component
 */
export default Section
