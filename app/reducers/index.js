const initialState = {
  collections: [{
    title: 'Something',
    author: 'Jure',
    fragments: [1, 2, 3]
  }],
  fragments: [
    {
      id: 1,
      title: 'one',
      source: 'hello'
    },
    {
      id: 2,
      title: 'two',
      source: 'hellohi'
    },
    {
      id: 3,
      title: 'three',
      source: 'hellothere'
    }
  ]
}

export function store (state = initialState, action) {
  // For now, don’t handle any actions
  // and just return the state given to us.
  return state
}
