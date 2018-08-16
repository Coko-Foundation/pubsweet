import React from 'react'
import { mount } from 'enzyme'
import createHistory from 'history/createBrowserHistory'
import styled from 'styled-components'

global.PUBSWEET_COMPONENTS = []
global.fetch = () => {}

const Root = require('../../src/components/Root').default
const configureStore = require('../../src/store/configureStore')

const history = createHistory()
const store = configureStore(history, {})
const themeObj = { color: 'blue' }

describe('<Root/>', () => {
  it('Adds a theme to context', async () => {
    const Box = styled.div`
      test: ${props => expect(props.theme.color).toBe('blue')};
    `

    mount(
      <Root
        connectToWebSocket={false}
        history={history}
        routes={<Box />}
        store={store}
        theme={themeObj}
      />,
    )
    expect.assertions(1)
  })
})
