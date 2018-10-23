import React from 'react'
import faker from 'faker'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from 'react-apollo/test-utils'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ThemeProvider } from 'styled-components'

import DashboardPage from './DashboardPage'
import { Section, UploadContainer } from './molecules/Page'
import queries from '../graphql/queries'
// this should be elsewhere
Enzyme.configure({ adapter: new Adapter() })

jest.mock('config', () => ({
  'pubsweet-client': {},
  authsome: {
    mode: 'authsome',
  },
  'pubsweet-component-xpub-dashboard': {
    acceptUploadFiles: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/x-latex',
      'text/vnd.latex-z',
      'text/x-tex',
      'application/pdf',
      'application/epub+zip',
      'application/zip',
    ],
  },
}))

// Mock out the API
jest.mock('pubsweet-client/src/helpers/api', () => ({
  get: jest.fn(url => {
    // Whatever the request is, return an empty array
    const response = []
    return new Promise(resolve => resolve(response))
  }),
}))

jest.mock(
  'pubsweet-client/src/helpers/AuthorizeWithGraphQL',
  () => 'AuthorizeWithGraphQL',
)

global.window.localStorage = {
  getItem: jest.fn(() => 'tok123'),
}

const mocks = [
  {
    request: {
      query: queries.dashboard,
    },
    result: {
      data: {
        currentUser: { id: faker.random.uuid(), username: 'test', admin: true },
        conversion: { converting: false },
        journals: {
          id: faker.random.uuid(),
          journalTitle: 'Xpub Test',
          manuscripts: [],
        },
      },
    },
  },
]

describe('DashboardPage', () => {
  it('runs', done => {
    const page = mount(
      <MemoryRouter>
        <ThemeProvider theme={{ colorPrimary: 'blue' }}>
          <MockedProvider addTypename={false} mocks={mocks}>
            <DashboardPage conversion={{ converting: false }} />
          </MockedProvider>
        </ThemeProvider>
      </MemoryRouter>,
    )

    setTimeout(() => {
      page.update()
      expect(page.find(UploadContainer)).toHaveLength(2)
      expect(page.find(Section)).toHaveLength(0)
      done()
    }, 1000)
  })
})
