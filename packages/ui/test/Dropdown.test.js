import React from 'react'
import renderer from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'
import 'jest-styled-components'

import { Dropdown } from '../src/'

describe('Dropdown', () => {
  const itemsList = [
    {
      id: '1',
      onClick: () => {},
      title: 'item 1',
    },
    {
      id: '2',
      onClick: () => {},
      title: 'item 2',
    },
  ]

  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Dropdown itemsList={itemsList} primary>
          Click me
        </Dropdown>,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('runs function on click', () => {
    const handleClickItem = jest.fn()
    itemsList[0].onClick = handleClickItem

    const { getByText } = render(
      <Dropdown itemsList={itemsList}>Hello</Dropdown>,
    )

    expect(handleClickItem).toHaveBeenCalledTimes(0)
    fireEvent.click(getByText('item 1'))
    expect(handleClickItem).toHaveBeenCalledTimes(1)
  })
})
