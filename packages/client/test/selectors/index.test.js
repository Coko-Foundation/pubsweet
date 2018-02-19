import { selectUser } from '../../src/selectors/index'

describe('Selectors', () => {
  it('selectUser', () => {
    const user2 = { id: 2, foo: 'bar' }
    const state = {
      users: {
        users: [{ id: 1 }, user2],
      },
    }

    expect(selectUser(state, { id: 2 })).toEqual(user2)
  })
})
