import styled from 'styled-components'
import { Link as UnstyledLink } from 'react-router-dom'

const Link = styled(UnstyledLink)`
  color: var(--color-primary);
  cursor: pointer;
`

/**
 * @component
 */
export default Link
