import React from 'react'
import { mount } from 'enzyme'
import { escapeRegExp } from 'lodash'
import TestThemeProvider from '@pubsweet/ui/test/setup/theme'

import SearchBox from './SearchBox'

const searchOptions = [
  { value: 'first option' },
  { value: 'final option' },
  { value: 'second option' },
]

const mockFilter = jest.fn((options, searchValue, field) => {
  if (!searchValue) return []

  const inputValue = searchValue.trim().toLowerCase()
  if (!inputValue) return []

  return options.filter(option =>
    option[field].toLowerCase().includes(inputValue),
  )
})

const mockMatchIndex = jest.fn((inputValue, option) => {
  const re = new RegExp(escapeRegExp(inputValue))
  const match = re.exec(option.toLowerCase())
  if (match) return match.index
  return -1
})

function makeWrapper() {
  return mount(
    <TestThemeProvider>
      <SearchBox
        filterFunction={mockFilter}
        getMatchIndex={mockMatchIndex}
        onSubmit={jest.fn()}
        options={searchOptions}
      />
    </TestThemeProvider>,
  )
}

const wrapper = makeWrapper()

describe('SearchBox component tests', () => {
  it('renders an input field', () => {
    expect(wrapper.find('input')).toHaveLength(1)
  })

  it('has search icon and a clear icon', () => {
    expect(wrapper.find('Icon')).toHaveLength(2)
  })

  it.skip.each([[1, 'option'], [2, 'f'], [3, 'xyz'], [4, '']])(
    'typing something will show suggestions based on filtering function, test %i',
    (index, searchValue) => {
      /**
       * TODO these should be re-enabled once we know the
       * dropdown/autosuggest behaviour
       *
       * these tests make the assumption that suggestions will
       * be correctly rendered from the state of the component
       *
       * in the future this should be changed to check for the
       * list of rendered suggestions directly
       */
      const expectedSuggestions = mockFilter(
        searchOptions,
        searchValue,
        'value',
      )
      wrapper
        .find('input')
        .simulate('change', { target: { value: searchValue } })
      const receivedSuggestions = wrapper.find(SearchBox).instance().state
        .suggestions
      expect(receivedSuggestions).toEqual(expectedSuggestions)
    },
  )

  it('does nothing when clicking on X icon and nothing is typed', () => {
    wrapper.find('button > [data-test-id="cross-icon"]').simulate('click')
    expect(wrapper.find('input').props().value).toEqual('')
  })

  it('clears the input field when x icon is clicked after typing something', () => {
    wrapper.find('input').simulate('change', { target: { value: 'something' } })
    wrapper.find('button > [data-test-id="cross-icon"]').simulate('click')
    expect(wrapper.find('input').props().value).toEqual('')
  })
})
