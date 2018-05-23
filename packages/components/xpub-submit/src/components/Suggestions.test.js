import React from 'react'
import Enzyme, { mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { FormSection, reduxForm } from 'redux-form'
import { compose, withProps } from 'recompose'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import Suggestions from './Suggestions'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('config', () => ({ 'pubsweet-client': {} }))

const mockStore = configureMockStore()
const store = mockStore({})

const suggestionsObject = {
  suggestions: {
    editors: {
      opposed: ['editor', 'opposed'],
      suggested: ['editor', 'suggested'],
    },
    reviewers: {
      opposed: ['reviewer', 'opposed'],
      suggested: ['reviewer', 'suggested'],
    },
  },
  readonly: true,
}

const getSuggested = object =>
  object
    .children('div')
    .first()
    .text()

const getOpposed = object =>
  object
    .children('div')
    .last()
    .text()

const renderReduxWrapper = wrappedComponent => {
  const SuggestionsEditable = compose(
    reduxForm({}),
    withProps({ readonly: false }),
  )(wrappedComponent)
  return render(
    <Provider store={store}>
      <form>
        <SuggestionsEditable />
      </form>
    </Provider>,
  )
}

const makeWrapper = (props = { readonly: true, suggestions: {} }) => {
  const version = Object.assign(
    {
      suggestions: {
        editors: {
          opposed: [],
          suggested: [],
        },
        reviewers: {
          opposed: [],
          suggested: [],
        },
      },
    },
    { suggestions: props.suggestions },
  )
  return mount(<Suggestions readonly={props.readonly} version={version} />)
}

const suggestions = makeWrapper(
  Object.assign(suggestionsObject, { readonly: true }),
)

describe('Suggestions', () => {
  it('shows an editable form', () => {
    expect(
      renderReduxWrapper(Suggestions).find('input[type="text"]'),
    ).toHaveLength(4)
  })

  it('shows a non-editable form', () => {
    const formSection = suggestions.find(FormSection)
    expect(formSection).toHaveLength(0)
  })

  it('shows none suggested, opposed editors', () => {
    const noneEditors = makeWrapper().find('div[id="suggestions.editors"]')
    expect(getSuggested(noneEditors)).toEqual('none')
    expect(getOpposed(noneEditors)).toEqual('none')
  })

  it('shows none suggested, opposed reviewers', () => {
    const noneReviewers = makeWrapper().find('div[id="suggestions.reviewers"]')
    expect(getSuggested(noneReviewers)).toEqual('none')
    expect(getOpposed(noneReviewers)).toEqual('none')
  })

  it('shows a comma seperated suggested, opposed reviewers', () => {
    const sectionReviewers = suggestions.find('div[id="suggestions.reviewers"]')
    expect(getSuggested(sectionReviewers)).toEqual('reviewer, suggested')

    expect(getOpposed(sectionReviewers)).toEqual('reviewer, opposed')
  })

  it('shows a comma seperated suggested, opposed editor', () => {
    const sectionEditors = suggestions.find('div[id="suggestions.editors"]')
    expect(getSuggested(sectionEditors)).toEqual('editor, suggested')

    expect(getOpposed(sectionEditors)).toEqual('editor, opposed')
  })
})
