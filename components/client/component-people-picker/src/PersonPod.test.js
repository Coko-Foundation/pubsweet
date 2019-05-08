import React from 'react'
import { mount } from 'enzyme'
import TestThemeProvider from '@pubsweet/ui/test/setup/theme'

import PersonPod from './PersonPod'

const handleSelectButtonClick = jest.fn()
const handleKeywordClick = jest.fn()

function makePersonPodWrapper(props) {
  return mount(
    <TestThemeProvider>
      <PersonPod {...props} />
    </TestThemeProvider>,
  )
}

const propsWithClickableFunctionality = {
  togglePersonSelection: handleSelectButtonClick,
  selectButtonType: 'add',
  name: 'Richard Aldrich',
  institution: 'Utrecht University',
  focuses: ['cell biology'],
  expertises: ['Cancer cells', 'Neroscience'],
  isKeywordClickable: true,
  isSelected: true,
  isStatusShown: false,
  onKeywordClick: handleKeywordClick,
}

describe('PersonPod component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('togglePersonSelection handler - fired when selection button is clicked', () => {
    const wrapper = makePersonPodWrapper(propsWithClickableFunctionality)
    const selectionButton = wrapper.find(
      'button[data-test-id="person-pod-button"]',
    )
    selectionButton.simulate('click')
    expect(handleSelectButtonClick.mock.calls).toHaveLength(1)
  })
})
