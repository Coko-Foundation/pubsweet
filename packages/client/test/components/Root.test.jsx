import React from 'react'
import { mount } from 'enzyme'
import styled from 'styled-components'
import Root, { stripTypenames } from '../../src/components/Root'

global.fetch = () => {}

const themeObj = { color: 'blue' }

describe('<Root/>', () => {
  it('Adds a theme to context', async () => {
    expect.assertions(1)

    const Box = styled.div`
      color: ${props => expect(props.theme.color).toBe('blue')};
    `

    mount(<Root connectToWebSocket={false} routes={<Box />} theme={themeObj} />)
  })
})

describe('stripTypenames', () => {
  it('works for null properties', () => {
    const variables = {
      someVar: 'someValue',
      __typename: 'thing',
      someNestedVar: {
        someOtherVar: 'someOtherValue',
        __typename: 'otherthing',
      },
      thirdThing: null,
    }

    expect(stripTypenames(variables)).toEqual({
      someVar: 'someValue',
      someNestedVar: {
        someOtherVar: 'someOtherValue',
      },
      thirdThing: null,
    })
  })
})
