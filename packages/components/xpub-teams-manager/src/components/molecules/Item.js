import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

const Item = styled.div`
  margin-bottom: ${th('gridUnit')};
`

const Header = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
`

const Body = styled.div`
  align-items: space-between;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${th('gridUnit')};
  padding-left: 1.5em;
`

const Divider = styled.span.attrs({
  children: props => ` ${props.separator} `,
})`
  color: ${th('colorFurniture')};
  white-space: pre;
`

export { Item, Header, Body, Divider }
