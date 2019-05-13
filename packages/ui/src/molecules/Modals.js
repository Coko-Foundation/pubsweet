import React from 'react'
import styled from 'styled-components'

import { Button } from '../atoms'
import { ModalProvider, Modal, useModal, withModal } from './modal'

function HooksComponent({ hideModal }) {
  const customLogic = () => {
    hideModal()
  }

  return (
    <Root>
      <Title>Hooks implementation</Title>
      <Buttons>
        <Button onClick={hideModal}>Close</Button>
        <Button onClick={customLogic}>Agree</Button>
      </Buttons>
    </Root>
  )
}

function HigherOrderComponent({ hideModal }) {
  const customLogic = () => {
    hideModal()
  }

  return (
    <Root>
      <Title>HOCs implementation</Title>
      <Buttons>
        <Button onClick={hideModal}>Close</Button>
        <Button onClick={customLogic}>Agree</Button>
      </Buttons>
    </Root>
  )
}

function ExampleComponent({ hideModal, title }) {
  const customLogic = () => {
    hideModal()
  }

  return (
    <Root>
      <Title>{title}</Title>
      <Buttons>
        <Button onClick={hideModal}>Close</Button>
        <Button onClick={customLogic}>Agree</Button>
      </Buttons>
    </Root>
  )
}

const ModalExamples = withModal({
  component: HigherOrderComponent,
})(props => {
  const ctx = useModal({
    component: HooksComponent,
  })

  return (
    <div>
      <h2>Using hooks</h2>
      <Button onClick={ctx.showModal}>Open with hooks</Button>
      <hr />
      <h2>Using render props</h2>
      <Modal component={ExampleComponent} title="Render props implementation">
        {showModal => (
          <Button onClick={showModal}>Open with render props</Button>
        )}
      </Modal>
      <hr />
      <h2>Using the higher order component</h2>
      <Button onClick={props.showModal}>Open with HOCs!</Button>
    </div>
  )
})

const Modals = () => (
  <ModalProvider>
    <h2>Modal examples</h2>
    <ModalExamples />
  </ModalProvider>
)

export default Modals

// #region styles
const Root = styled.div`
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  width: 400px;
`

const Title = styled.h2`
  font-weight: 700;
`

const Buttons = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 100%;

  button {
    height: 40px;
    width: 120px;
  }
`
// #endregion
