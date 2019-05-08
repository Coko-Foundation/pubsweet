import styled, { css } from 'styled-components'

const modalPosition = () => css`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
`

const ModalRoot = styled.div`
  align-items: center;
  background-color: ${({ overlayColor }) =>
    overlayColor || 'rgba(0, 0, 0, 0.8)'};
  display: flex;
  justify-content: center;

  ${modalPosition};

  * {
    box-sizing: border-box;
  }
`

export default ModalRoot
