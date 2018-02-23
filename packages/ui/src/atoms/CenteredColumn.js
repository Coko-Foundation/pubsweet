import styled from 'styled-components'
import PropTypes from 'prop-types'

const CenteredColumn = styled.div`
  margin: 0 auto;
  width: ${props =>
    (props.small && '40ch') || (props.medium && '60ch') || '60ch'};
`

CenteredColumn.propTypes = {
  small: PropTypes.bool,
  medium: PropTypes.bool,
}

/**
 * @component
 */
export default CenteredColumn
