import styled from 'styled-components'
import { th, override } from '@pubsweet/ui-toolkit'

const ErrorText = styled.div`
  color: ${th('colorError')};

  ${override('ErrorText')};
`

/**
 * @component
 */
export default ErrorText
