import React from 'react'
import PropTypes from 'prop-types'
import Enzyme, { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'
import faker from 'faker'
import { withJournal } from 'xpub-journal'
import EditorItem from './EditorItem'

import MetadataOwners from '../metadata/MetadataOwners'
import MetadataStreamLined from '../metadata/MetadataStreamLined'
import MetadataSubmittedDate from '../metadata/MetadataSubmittedDate'
import MetadataType from '../metadata/MetadataType'
import MetadataSections from '../metadata/MetadataSections'
import MetadataReviewType from '../metadata/MetadataReviewType'

// this should be elsewhere
Enzyme.configure({ adapter: new Adapter() })

jest.mock('config', () => ({
  'pubsweet-client': {},
  authsome: {
    mode: 'authsome',
  },
}))

jest.mock('pubsweet-client/src/helpers/Authorize', () => 'Authorize')

const journal = {
  reviewStatus: ['invited', 'accepted', 'rejected', 'completed'],
  articleTypes: [
    {
      label: 'Original Research Report',
      value: 'original-research',
    },
  ],
  articleSections: [
    {
      label: 'Cognitive Psychology',
      value: 'cognitive-psychology',
    },
  ],
}

describe('EditorItem', () => {
  const makeWrapper = (props = {}) => {
    props = Object.assign(
      {
        version: {
          id: faker.random.uuid(),
          submitted: '2018-06-07',
          metadata: {},
          declarations: {},
        },
        project: {
          id: faker.random.uuid(),
          title: faker.lorem.sentence(15),
          status: 'submitted',
          owners: [],
        },
      },
      props,
    )
    return mount(
      <MemoryRouter>
        <EditorItem {...props} />
      </MemoryRouter>,
      {
        context: { journal },
        childContextTypes: {
          journal: PropTypes.Object,
        },
      },
    )
  }

  it('shows empty metadata', () => {
    const EditorItem = makeWrapper()

    expect(EditorItem.find(MetadataStreamLined).children()).toHaveLength(0)
    expect(EditorItem.find(MetadataOwners).children()).toHaveLength(0)
    expect(
      EditorItem.find(withJournal(MetadataSections)).children(),
    ).toHaveLength(0)
    expect(
      EditorItem.find(MetadataSubmittedDate)
        .children()
        .text(),
    ).toEqual('2018-06-07')
    expect(
      EditorItem.find(MetadataType)
        .children()
        .text(),
    ).toEqual('None')
    expect(
      EditorItem.find(MetadataReviewType)
        .children()
        .text(),
    ).toEqual('Closed review')
  })

  it('shows all metadata', () => {
    const username = faker.name.findName()
    const EditorItem = makeWrapper({
      version: {
        submitted: '2018-06-07',
        metadata: {
          articleType: 'original-research',
          articleSection: ['cognitive-psychology'],
        },
        declarations: {
          openPeerReview: 'yes',
          streamlinedReview: 'yes',
        },
      },
      project: {
        owners: [{ username }],
      },
    })

    expect(EditorItem.find(MetadataStreamLined).text()).toEqual('Streamlined')
    expect(
      EditorItem.find(MetadataOwners)
        .children()
        .text(),
    ).toEqual(username)

    expect(
      EditorItem.find(MetadataSections)
        .children()
        .text(),
    ).toEqual(journal.articleSections[0].label)
    expect(
      EditorItem.find(MetadataSubmittedDate)
        .children()
        .text(),
    ).toEqual('2018-06-07')
    expect(
      EditorItem.find(MetadataType)
        .children()
        .text(),
    ).toEqual(journal.articleTypes[0].label)
    expect(
      EditorItem.find(MetadataReviewType)
        .children()
        .text(),
    ).toEqual('Open review')
  })
})
