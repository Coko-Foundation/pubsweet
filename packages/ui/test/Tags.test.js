import React from 'react'
import 'jest-styled-components'
import renderer from 'react-test-renderer'
import Tags from '../src/atoms/Tags'

// https://github.com/facebook/react/issues/7740#issuecomment-247335106
const createNodeMock = el => document.createElement(el.type)

describe('Tags', () => {
  test('matches snapshot', () => {
    const tree = renderer.create(<Tags />, { createNodeMock }).toJSON()
    // Check that react-tags-autocomplete classnames are applied to children of styled component
    expect(tree).toHaveStyleRule('cursor', 'text', { modifier: ' .react-tags' })
  })
})
