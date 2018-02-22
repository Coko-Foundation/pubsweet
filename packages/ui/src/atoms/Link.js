import styled from 'styled-components'
import { Link as UnstyledLink } from 'react-router-dom'

const Link = styled(UnstyledLink)`
  color: ${props => props.theme.colorPrimary};
  cursor: pointer;
`

/**
 * @component
 */
export default Link
