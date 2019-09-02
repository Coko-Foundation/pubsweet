import React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render } from 'react-testing-library'

import ModalProvider from '../src/molecules/modal/ModalProvider'
import { Modal, useModal, withModal } from '../src/molecules/modal'

const ExampleModal = () => <div>I am your modal</div>

const ExampleModalWithHooks = () => {
  const [counter, setCounter] = React.useState(0)
  return (
    <button onClick={() => setCounter(c => c + 1)}>
      Counter value: {counter}
    </button>
  )
}

const HooksExample = () => {
  const ctx = useModal({
    component: ExampleModal,
  })

  return (
    <div>
      <button onClick={ctx.showModal}>Click me!</button>
    </div>
  )
}

const HOCExample = withModal({
  component: ExampleModal,
})(({ showModal }) => (
  <div>
    <button onClick={showModal}>Click me!</button>
  </div>
))

const TitleModal = ({ title }) => (
  <div>
    <span>{title}</span>I am your modal!
  </div>
)

describe('Modal', () => {
  beforeEach(cleanup)

  it('render props', () => {
    const { getByText } = render(
      <ModalProvider>
        <Modal component={ExampleModal}>
          {showModal => <button onClick={showModal}>Click me!</button>}
        </Modal>
      </ModalProvider>,
    )
    fireEvent.click(getByText(/Click me!/i))

    expect(getByText(/i am your modal/i)).toBeInTheDocument()
  })

  it('using hooks', () => {
    const { getByText } = render(
      <ModalProvider>
        <HooksExample />
      </ModalProvider>,
    )

    fireEvent.click(getByText(/Click me!/i))
    expect(getByText(/i am your modal/i)).toBeInTheDocument()
  })

  it('with HOC', () => {
    const { getByText } = render(
      <ModalProvider>
        <HOCExample />
      </ModalProvider>,
    )

    fireEvent.click(getByText(/Click me!/i))
    expect(getByText(/i am your modal/i)).toBeInTheDocument()
  })

  it('closes when clicking on the overlay', () => {
    const { getByText, getByTestId, queryByText } = render(
      <ModalProvider>
        <Modal component={ExampleModal} dismissable>
          {showModal => <button onClick={showModal}>Click me!</button>}
        </Modal>
      </ModalProvider>,
    )

    fireEvent.click(getByText(/Click me!/i))
    expect(getByText(/i am your modal/i)).toBeInTheDocument()

    fireEvent.click(getByTestId('modal-overlay'))
    expect(queryByText(/i am your modal/i)).toBeNull()
  })

  it('Modal component gets the correct props passed to it', () => {
    const { getByText } = render(
      <ModalProvider>
        <Modal component={TitleModal} dismissable title="I am a title">
          {showModal => <button onClick={showModal}>Click me!</button>}
        </Modal>
      </ModalProvider>,
    )

    fireEvent.click(getByText(/Click me!/i))

    expect(getByText(/i am a title/i)).toBeInTheDocument()
  })

  it('should render component that is using hooks', () => {
    const { getByText } = render(
      <ModalProvider>
        <Modal component={ExampleModalWithHooks} dismissable>
          {showModal => <button onClick={showModal}>Click me!</button>}
        </Modal>
      </ModalProvider>,
    )

    fireEvent.click(getByText(/Click me!/i))

    expect(getByText(/Counter value: 0/i)).toBeInTheDocument()
  })
})
