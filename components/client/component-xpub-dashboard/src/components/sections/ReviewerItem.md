A dashboard item showing a project that the current user is a reviewer of.

```js
const currentUserId = 1

const currentUser = {
  id: currentUserId,
  username: faker.lorem.word(),
}

const version = {
  id: faker.random.uuid(),
  reviews: [
    {
      id: faker.random.uuid(),
      recommedation: 'review',
    },
  ],
  teams: [
    {
      created: new Date().toDateString(),
      updated: new Date().toDateString(),
      members: [
        {
          user: currentUser,
          status: 'invited',
        },
      ],
      role: 'reviewer',
    },
  ],
}
;<ReviewerItem version={version} currentUser={currentUser} />
```

When the reviewer has accepted the invitation to review, a link to perform their review is displayed.

```js
const currentUserId = 1

const currentUser = {
  id: currentUserId,
}

const version = {
  id: faker.random.uuid(),
  reviews: [
    {
      id: faker.random.uuid(),
      recommedation: 'review',
    },
  ],
  teams: [
    {
      created: new Date().toDateString(),
      updated: new Date().toDateString(),
      members: [
        {
          user: currentUser,
          status: 'accepted',
        },
      ],
      role: 'reviewer',
    },
  ],
}
;<ReviewerItem version={version} currentUser={currentUser} />
```

When the reviewer has declined the invitation to review, they can't perform any further actions.

```js
const currentUserId = 1

const currentUser = {
  id: currentUserId,
}

const version = {
  id: faker.random.uuid(),
  reviews: [
    {
      id: faker.random.uuid(),
      recommedation: 'review',
    },
  ],
  teams: [
    {
      created: new Date().toDateString(),
      updated: new Date().toDateString(),
      members: [
        {
          user: currentUser,
          status: 'rejected',
        },
      ],
      role: 'reviewer',
    },
  ],
}
;<ReviewerItem version={version} currentUser={currentUser} />
```