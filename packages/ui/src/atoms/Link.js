import styled from 'styled-components'
import { Link as UnstyledLink } from 'react-router-dom'
import fromTheme from '../helpers/fromTheme'

const Link = styled(UnstyledLink)`
  color: ${fromTheme.colorPrimary};
  cursor: pointer;
`

/**
 * @component
 */
export default Link
