import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

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

    // console.log(diveTo(formbuilder, 'lifecycle(FormBuilder)', {}))
    expect(
      diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
        .dive()
        .find('#builder-element'),
    ).toHaveLength(1)

    expect(
      diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
        .dive()
        .find('#builder-element')
        .dive(),
    ).toHaveLength(1)
    expect(
      diveTo(formbuilder, 'lifecycle(FormBuilder)', {})
        .dive()
        .find('#add-element'),
    ).toHaveLength(1)
  })

  //   it('shows a list of teams created', () => {
  //     const teammanager = makeWrapper({
  //       teams: [
  //         {
  //           id: 1,
  //           name: 'team1',
  //           teamType: {
  //             name: 'Senior Editors',
  //             permissions: '',
  //           },
  //           object: {
  //             type: 'collection',
  //             id: '1',
  //           },
  //           members: [],
  //         },
  //         {
  //           id: 1,
  //           name: 'team2',
  //           teamType: {
  //             name: 'Handling Editors',
  //             permissions: '',
  //           },
  //           object: {
  //             type: 'collection',
  //             id: '1',
  //           },
  //           members: [],
  //         },
  //       ],
  //     })

  //     expect(teammanager.find(Team)).toHaveLength(2)
  //   })
})
