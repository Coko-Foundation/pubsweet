import styled from 'styled-components'
import { Link as UnstyledLink } from 'react-router-dom'
import { th, override } from '@pubsweet/ui-toolkit'

const Link = styled(UnstyledLink)`
  color: ${th('colorPrimary')};
  cursor: pointer;

  ${override('ui.Link')};
`

/**
 * @component
 */
export default Link
