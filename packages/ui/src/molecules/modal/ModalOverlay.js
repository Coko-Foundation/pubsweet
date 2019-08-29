import { get } from 'lodash'
import styled, { css } from 'styled-components'

const modalPosition = () => css`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
`

const ModalRoot = styled.div.attrs(() => ({
  'data-test-id': 'modal-overlay',
}))`
  align-items: center;
  background-color: ${({ overlayColor }) =>
    overlayColor || 'rgba(0, 0, 0, 0.8)'};
  display: flex;
  justify-content: ${props => get(props, 'justifyContent', 'center')};

  ${modalPosition};

  * {
    box-sizing: border-box;
  }
`

export default ModalRoot
