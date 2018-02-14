import styled from 'styled-components'

const ControlGroup = styled.div`
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
`

/**
 * @component
 */
export default ControlGroup
