import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Action } from '@pubsweet/ui'

import { diveTo } from './util'
import FormBuilder from '../components/FormBuilder'
import forms from './config/test.json'
import formsnoelements from './config/testnoelements.json'

// this should be elsewhere
Enzyme.configure({ adapter: new Adapter() })

jest.mock('config', () => ({
  'pubsweet-client': {},
  authsome: {
    mode: 'authsome',
    teams: {
      seniorEditor: {
        name: 'Senior Editors',
        permissions: '',
      },
      handlingEditor: {
        name: 'Handling Editors',
        permissions: '',
      },
      managingEditor: {
        name: 'Managing Editors',
        permissions: '',
      },
      reviewer: {
        name: 'Reviewer',
        permissions: '',
      },
    },
  },
}))

describe('FormBuilder', () => {
  const makeWrapper = (props = {}) => {
    props = Object.assign(
      {
        form: formsnoelements[0],
      },
      props,
    )

    return shallow(<FormBuilder {...props} />)
  }

  it('shows just the add element button', () => {
    const formbuilder = makeWrapper()
    expect(
      diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
        .dive()
        .find('#builder-element'),
    ).toHaveLength(0)

    expect(
      diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
        .dive()
        .find('#add-element'),
    ).toHaveLength(1)
  })

  it('shows add element button and form elements', () => {
    const formbuilder = makeWrapper({ form: forms[0] })

    expect(
      diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
        .dive()
        .find('#builder-element')
        .dive()
        .at(0),
    ).toHaveLength(2)

    expect(
      diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
        .dive()
        .find('#add-element'),
    ).toHaveLength(1)
  })

  it('adds empty element to the form', () => {
    const formbuilder = makeWrapper()
    expect(
      diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
        .dive()
        .find('#builder-element'),
    ).toHaveLength(0)

    diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
      .dive()
      .find('#add-element')
      .dive()
      .find(Action)
      .simulate('click')

    formbuilder.update()

    expect(
      diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
        .dive()
        .find('#builder-element'),
    ).toHaveLength(1)
  })
})
