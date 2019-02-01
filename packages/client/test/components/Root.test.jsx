import React from 'react'
import { mount } from 'enzyme'
import styled from 'styled-components'

global.PUBSWEET_COMPONENTS = []
global.fetch = () => {}

const Root = require('../../src/components/Root').default

const themeObj = { color: 'blue' }

describe('<Root/>', () => {
  it.skip('Adds a theme to context', async () => {
    const Box = styled.div`
      test: ${props => expect(props.theme.color).toBe('blue')};
    `

    mount(<Root connectToWebSocket={false} routes={<Box />} theme={themeObj} />)
    expect.assertions(1)
  })
})
