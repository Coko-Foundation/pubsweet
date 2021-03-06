import React from 'react'
import { mount } from 'enzyme'
import TestThemeProvider from '@pubsweet/ui/test/setup/theme'
import PeoplePickerLogic from './PeoplePickerLogic'
import PeoplePickerBody from './PeoplePickerBody'
import PersonPod from './PersonPod'
import SearchBox from './SearchBox'

jest.useFakeTimers()

const people = [
  {
    id: 1,
    name: 'Annie Nadine',
    aff: 'eLife',
    focuses: ['biophysics and structural biology', 'immunology'],
    expertises: ['Evolutionary Biology', 'Microbiology and Infectious Disease'],
  },
  {
    id: 2,
    name: 'Bobby Aaron',
    aff: 'eLife',
    focuses: ['cell biology'],
    expertises: [
      'Biochemistry and Chemical Biology',
      'Chromosomes and Gene Expression',
    ],
  },
  {
    id: 3,
    name: 'Chastity Bob',
    aff: 'eLife',
    focuses: ['computational and systems biology'],
    expertises: [
      'Developmental Biology',
      'Stem Cells and Regenerative Medicine',
    ],
  },
  {
    id: 4,
    name: 'Dave Paul',
    aff: 'eLife',
    focuses: ['auditory cognition'],
    expertises: ['Neuroscience'],
  },
]

const makeWrapper = props => {
  const wrapper = mount(
    <TestThemeProvider>
      <PeoplePickerLogic
        // need to pass children as a prop in order to override it in some tests
        // eslint-disable-next-line react/no-children-prop
        children={innerProps => <PeoplePickerBody {...innerProps} />}
        onCancel={jest.fn()}
        onSubmit={jest.fn()}
        people={people}
        {...props}
      />
    </TestThemeProvider>,
  )
  jest.runAllTimers()
  wrapper.update()
  return wrapper
}

const getPersonPodButton = (wrapper, index) =>
  wrapper.find('button[data-test-id="person-pod-button"]').at(index)

const expectSelectionLength = (wrapper, length) =>
  expect(wrapper.find('SelectedItem')).toHaveLength(length)

describe('PeoplePicker', () => {
  it('calls child render prop', () => {
    const render = jest.fn(() => null)
    makeWrapper({ children: render })
    expect(render).toHaveBeenCalled()
  })

  it('renders as many person pods as people', () => {
    const wrapper = makeWrapper()
    const buttons = wrapper.find('PersonPod')

    expect(buttons).toHaveLength(people.length)
  })

  it('clicking the icon adds/removes a selected item from the page', () => {
    const wrapper = makeWrapper()
    expectSelectionLength(wrapper, 0)

    getPersonPodButton(wrapper, 0).simulate('click')
    expectSelectionLength(wrapper, 1)

    getPersonPodButton(wrapper, 0).simulate('click')
    expectSelectionLength(wrapper, 0)
  })

  it('cannot select more pods when maximum is reached', () => {
    const wrapper = makeWrapper({ maxSelection: 1 })
    expectSelectionLength(wrapper, 0)

    getPersonPodButton(wrapper, 0).simulate('click')
    expectSelectionLength(wrapper, 1)

    getPersonPodButton(wrapper, 1).simulate('click')
    expectSelectionLength(wrapper, 1)
  })

  it('allows submit only after minimum is met', () => {
    const onSubmit = jest.fn()
    const wrapper = makeWrapper({ minSelection: 1, onSubmit })

    wrapper
      .find('PeoplePickerLogic')
      .instance()
      .handleSubmit()
    expect(onSubmit).not.toHaveBeenCalled()

    getPersonPodButton(wrapper, 0).simulate('click')
    wrapper
      .find('PeoplePickerLogic')
      .instance()
      .handleSubmit()

    expect(onSubmit).toHaveBeenCalled()
  })

  it('clicking on selected item icon removes it', () => {
    const wrapper = makeWrapper()
    expectSelectionLength(wrapper, 0)
    getPersonPodButton(wrapper, 0).simulate('click')
    expectSelectionLength(wrapper, 1)

    wrapper
      .find('SelectedItem')
      .find('RemoveButton')
      .simulate('click')

    expectSelectionLength(wrapper, 0)
  })

  describe('integration with Search Box', () => {
    const searchWrapper = mount(
      <TestThemeProvider>
        <PeoplePickerLogic
          // need inner props for search box
          // eslint-disable-next-line react/no-children-prop
          children={innerProps => (
            <div>
              <SearchBox
                filterFunction={innerProps.filterFunction}
                getMatchIndex={innerProps.getMatchIndex}
                onSubmit={innerProps.searchSubmit}
                options={innerProps.searchOptions}
              />
              <PeoplePickerBody {...innerProps} />
            </div>
          )}
          onCancel={jest.fn()}
          onSubmit={jest.fn()}
          people={people}
        />
      </TestThemeProvider>,
    )

    function searchFor(inputValue) {
      const input = searchWrapper.find('input[data-test-id="search-input"]')
      input.simulate('change', { target: { value: inputValue } })
      input.simulate('keyDown', { charCode: 13, key: 'Enter' })
      jest.runAllTimers()
    }

    it('shows all people pods on empty search input', () => {
      searchFor('')
      expect(searchWrapper.find(PersonPod)).toHaveLength(people.length)
    })

    it('filters the people pods based on search input, single match', () => {
      searchFor('annie')
      expect(searchWrapper.find(PersonPod)).toHaveLength(1)

      expect(
        searchWrapper
          .find('PersonPod')
          .find('p')
          .at(0)
          .text(),
      ).toEqual('Annie Nadine')
    })

    it('filters the people pods based on search input, multiple matches', () => {
      searchFor('bob')
      expect(searchWrapper.find('PersonPod')).toHaveLength(2)
      expect(
        searchWrapper
          .find('PersonPod')
          .at(0)
          .find('p')
          .at(0)
          .text(),
      ).toEqual('Bobby Aaron')
      expect(
        searchWrapper
          .find('PersonPod')
          .at(1)
          .find('p')
          .at(0)
          .text(),
      ).toEqual('Chastity Bob')
    })

    it('does match characters in the middle of the word', () => {
      searchFor('y')
      expect(searchWrapper.find('PersonPod')).toHaveLength(4)
    })

    it('filters the people pods when you click on the search icon', () => {
      const input = searchWrapper.find('input')
      input.simulate('change', { target: { value: 'annie' } })
      searchWrapper
        .find('button > [data-test-id="search-icon"]')
        .simulate('click')
      expect(searchWrapper.find('PersonPod')).toHaveLength(1)
    })

    it('shows all person pods again after clicking the x icon', () => {
      searchFor('annie')
      searchWrapper
        .find('button > [data-test-id="cross-icon"]')
        .simulate('click')
      expect(searchWrapper.find('PersonPod')).toHaveLength(people.length)
    })

    it('filters the people pods after keywords', () => {
      searchFor('biology')
      expect(searchWrapper.find('PersonPod')).toHaveLength(3)
      expect(
        searchWrapper
          .find('PersonPod')
          .at(0)
          .find('p')
          .at(0)
          .text(),
      ).toEqual('Annie Nadine')
      expect(
        searchWrapper
          .find('PersonPod')
          .at(1)
          .find('p')
          .at(0)
          .text(),
      ).toEqual('Bobby Aaron')
      expect(
        searchWrapper
          .find('PersonPod')
          .at(2)
          .find('p')
          .at(0)
          .text(),
      ).toEqual('Chastity Bob')
    })
  })
})
