import styled from 'styled-components'
import { Link as UnstyledLink } from 'react-router-dom'
import { th } from '@pubsweet/ui-toolkit'

const Link = styled(UnstyledLink)`
  color: ${th('colorPrimary')};
  cursor: pointer;
`

/**
 * @component
 */
export default Link
