import styled from 'styled-components'

import { th, override } from '@pubsweet/ui-toolkit'

const Tab = styled.div`
  padding: ${th('subGridUnit')} 1em;
  font-size: ${th('fontSizeBaseSmall')};
  border-width: 0 ${th('borderWidth')} ${th('borderWidth')} 0;
  border-style: ${th('borderStyle')};
  border-color: ${({ active, theme }) =>
    active ? theme.colorPrimary : theme.colorBorder};

  ${override('ui.Tab')};
`

/** @component */
export default Tab
