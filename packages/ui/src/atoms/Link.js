import styled from 'styled-components'
import { Link as UnstyledLink } from 'react-router-dom'
import th from '../helpers/themeHelper'

const Link = styled(UnstyledLink)`
  color: ${th('colorPrimary')};
  cursor: pointer;
`

/**
 * @component
 */
export default Link
