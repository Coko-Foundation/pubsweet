import styled from 'styled-components'
import theme from '../helpers/theme'

const fontSize = ({ theme, level = 1 }) =>
  ({
    1: theme.fontSizeHeading1,
    2: theme.fontSizeHeading2,
    3: theme.fontSizeHeading3,
    4: theme.fontSizeHeading4,
    5: theme.fontSizeHeading5,
    6: theme.fontSizeHeading6,
  }[level])

const Title = styled.div`
  font-size: ${fontSize};
  font-family: ${theme.fontHeading};
  margin-bottom: ${theme.gridUnit};
`

/**
 * @component
 */
export default Title
