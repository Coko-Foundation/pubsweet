import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

export const Heading1 = styled.h1`
  margin: 0 0 calc(${th('gridUnit')} * 3);
  font-size: ${th('fontSizeHeading1')};
  line-height: ${th('lineHeightHeading1')};
`

export const Section = styled.div`
  margin: calc(${th('gridUnit')} * 6) 0;
`

export const Legend = styled.div`
  font-size: ${th('fontSizeBase')};
  font-weight: 600;
  margin-bottom: ${({ space, theme }) => space && theme.gridUnit};
`
export const SubNote = styled.span`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  color: ${th('colorTextPlaceholder')};
  page-break-before: always;
`
