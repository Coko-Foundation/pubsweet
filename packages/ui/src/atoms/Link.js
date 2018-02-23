import styled from 'styled-components'
import { Link as UnstyledLink } from 'react-router-dom'
import theme from '../helpers/theme'

const Link = styled(UnstyledLink)`
  color: ${theme.colorPrimary};
  cursor: pointer;
`

/**
 * @component
 */
export default Link
