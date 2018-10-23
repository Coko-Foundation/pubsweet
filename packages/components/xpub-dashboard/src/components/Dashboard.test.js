import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Dashboard from './Dashboard'
import { UploadContainer } from './molecules/Page'
import OwnerItem from './sections/OwnerItem'
import ReviewerItem from './sections/ReviewerItem'
import EditorItem from './sections/EditorItem'

// this should be elsewhere
Enzyme.configure({ adapter: new Adapter() })

jest.mock('config', () => ({
  'pubsweet-client': {},
  authsome: {
    mode: 'authsome',
  },
}))

jest.mock(
  'pubsweet-client/src/helpers/AuthorizeWithGraphQL',
  () => 'AuthorizeWithGraphQL',
)

const getProjects = item => item.map(c => c.props().version)

describe('Dashboard', () => {
  const makeWrapper = (props = {}) => {
    props = Object.assign(
      {
        dashboard: {},
        journals: {},
      },
      props,
    )

    return shallow(<Dashboard {...props} />)
  }

  it('shows a message when there are no projects', () => {
    const dashboard = makeWrapper()
    expect(dashboard.find(UploadContainer)).toHaveLength(2)

    expect(dashboard.find(OwnerItem)).toHaveLength(0)
    expect(dashboard.find(ReviewerItem)).toHaveLength(0)
  })

  it('shows a list of manuscripts submitted by the current user', () => {
    const dashboard = makeWrapper({
      dashboard: [{ id: 1 }],
      journals: { id: 1 },
    })
    expect(dashboard.find('.empty')).toHaveLength(0)
    const section = dashboard.find(OwnerItem)
    expect(section).toHaveLength(1)
    expect(getProjects(section)).toEqual([{ id: 1 }])
  })

  it('shows a list of manuscirpts to be reviewed', () => {
    const dashboard = makeWrapper({
      dashboard: [{ id: 1 }],
      journals: { id: 1 },
    })

    expect(dashboard.find(UploadContainer)).toHaveLength(1)
    const section = dashboard.find(ReviewerItem)
    expect(section).toHaveLength(1)
    expect(getProjects(section)).toEqual([{ id: 1 }])
  })

  it('shows a list of projects of which the current user is the editor', () => {
    const dashboard = makeWrapper({
      dashboard: [{ id: 1 }],
      journals: { id: 1 },
    })

    expect(dashboard.find(UploadContainer)).toHaveLength(1)
    const section = dashboard.find(EditorItem)
    expect(section).toHaveLength(1)
    expect(getProjects(section)).toEqual([{ id: 1 }])
  })
})
