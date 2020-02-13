import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import Authsome from 'authsome'
import Authorize from '../../src/helpers/Authorize'
import {
  CURRENT_USER,
  GET_USER,
  GET_COLLECTION,
  GET_FRAGMENT,
  GET_TEAM,
} from '../../src/helpers/AuthorizeGraphQLQueries'

const user1 = {
  id: 'user1',
  username: 'admin',
  admin: true,
  teams: [],
}

const nonAdminUser = {
  id: 'non-admin',
  username: 'nonadmin',
  admin: false,
  teams: [],
}

const fragment1 = {
  id: 'fragment1',
  fragmentType: 'blogpost',
  owners: [{ id: user1.id }],
}
const team1 = {
  id: 'team1',
  members: [{ id: user1.id }],
  role: 'editors',
  object: { objectId: 'fragment1', objectType: 'fragment' },
  name: 'team',
  global: false,
}

const collection1 = {
  id: 'collection1',
  fragments: [{ id: fragment1.id }],
  owners: [{ id: user1.id }],
}

const mocks = currentUser => [
  {
    request: {
      query: CURRENT_USER,
    },
    result: {
      data: {
        currentUser,
      },
    },
  },
  {
    request: {
      query: GET_USER,
      variables: {
        id: 'user1',
      },
    },
    result: {
      data: {
        user: user1,
      },
    },
  },
  {
    request: {
      query: GET_USER,
      variables: {
        id: 'non-admin',
      },
    },
    result: {
      data: {
        user: nonAdminUser,
      },
    },
  },
  {
    request: {
      query: GET_USER,
      variables: {
        id: 'non-existent',
      },
    },
    result: {
      data: {
        user: null,
      },
      errors: [{ message: 'Object not found: user with id non-existent' }],
    },
  },
  {
    request: {
      query: GET_COLLECTION,
      variables: {
        id: 'collection1',
      },
    },
    result: {
      data: {
        collection: collection1,
      },
    },
  },
  {
    request: {
      query: GET_FRAGMENT,
      variables: {
        id: 'fragment1',
      },
    },
    result: {
      data: {
        fragment: fragment1,
      },
    },
  },
  {
    request: {
      query: GET_TEAM,
      variables: {
        id: 'team1',
      },
    },
    result: {
      data: {
        team: team1,
      },
    },
  },
]

function makeDeepWrapper(currentUser, props = {}) {
  return mount(
    <MockedProvider addTypename={false} mocks={mocks(currentUser)}>
      <Authorize {...props}>
        <div>Only for admins</div>
      </Authorize>
    </MockedProvider>,
  )
}

async function updateWrapper(wrapper, amount = 0) {
  await act(async () => {
    await wait(amount)
    wrapper.update()
  })
}

// This is an integration test of sorts, as the only thing mocked is the
// GraphQL API's response. Given an authsome mode that allows everything
// for admins and nothing for anyone else, the AuthorizeGraphQLWrapper
// should behave as described.

describe('AuthorizeGraphQLWrapper', () => {
  const authsomeMode = async (userId, operation, object, context) => {
    if (!userId) return false
    const user = await context.models.User.find(userId)
    return user.admin
  }

  it('renders children when user is admin', async () => {
    const authsome = new Authsome({ mode: authsomeMode })
    const wrapper = makeDeepWrapper(user1, { authsome })

    await updateWrapper(wrapper, 100)
    const div = wrapper.find('div')
    expect(div).toHaveLength(1)
    expect(div.text()).toBe('Only for admins')
  })

  it('renders nothing when user is not admin', async () => {
    const authsome = new Authsome({ mode: authsomeMode })

    const wrapper = makeDeepWrapper(nonAdminUser, { authsome })

    await updateWrapper(wrapper, 100)
    const div = wrapper.find('div')
    expect(div).toHaveLength(0)
  })

  it('optionally shows alternative content when not authorized (unauthorized prop is a component)', async () => {
    const authsome = new Authsome({ mode: authsomeMode })

    const wrapper = await makeDeepWrapper(nonAdminUser, {
      authsome,
      unauthorized: <span />,
    })

    await updateWrapper(wrapper, 100)
    const div = wrapper.find('div')
    expect(div).toHaveLength(0)

    const span = wrapper.find('span')
    expect(span).toHaveLength(1)
    // })
  })

  it('optionally shows alternative content when not authorized (unauthorized prop is a fn)', async () => {
    const authsome = new Authsome({ mode: authsomeMode })

    const wrapper = await makeDeepWrapper(nonAdminUser, {
      authsome,
      unauthorized: () => <span />,
    })

    await updateWrapper(wrapper, 100)
    const div = wrapper.find('div')
    expect(div).toHaveLength(0)
    const span = wrapper.find('span')
    expect(span).toHaveLength(1)
  })
})

describe('Authsome GraphQL context', () => {
  const authsomeMode = async (userId, operation, object, context) => {
    const user = await context.models.User.find('user1')
    expect(user).toEqual(user1)

    const collection = await context.models.Collection.find('collection1')
    expect(collection).toEqual(collection1)

    const fragment = await context.models.Fragment.find('fragment1')
    expect(fragment).toEqual(fragment1)

    const team = await context.models.Team.find('team1')
    expect(team).toEqual(team1)

    return true
  }

  it('can query all models through the context', async () => {
    const authsome = new Authsome({ mode: authsomeMode })
    const wrapper = await makeDeepWrapper(user1, { authsome })

    await updateWrapper(wrapper, 100)
    const div = wrapper.find('div')
    expect(div).toHaveLength(1)
    expect(div.text()).toBe('Only for admins')
  })
})

describe('A query for a missing object', () => {
  let error

  const authsomeMode = async (userId, operation, object, context) => {
    try {
      await context.models.User.find('non-existent')
    } catch (e) {
      error = e
      throw e
    }
  }

  it('fails authorization if user is missing', async () => {
    console.error = jest.fn()
    const authsome = new Authsome({ mode: authsomeMode })
    const wrapper = makeDeepWrapper(user1, { authsome })

    await updateWrapper(wrapper, 20)
    const div = wrapper.find('div')
    expect(div).toHaveLength(0)
    expect(console.error).toHaveBeenCalledWith(error)
    console.error.mockRestore()
  })
})

jest.mock(
  'fake-mode',
  () => async (userId, operation, object, context) => true,
  { virtual: true },
)

describe('Actual use of Authorize', () => {
  it('renders without supplying authsome in props', async () => {
    // Gets authsome mode from the config
    const wrapper = makeDeepWrapper(user1)
    await updateWrapper(wrapper, 20)
    const div = wrapper.find('div')
    expect(div.text()).toBe('Only for admins')
  })
})
