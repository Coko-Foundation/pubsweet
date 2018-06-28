A dashboard item showing a project that the current user is a reviewer of.

```js
const currentUserId = 1

const currentUser = {
  id: currentUserId,
}

initialState = {
  reviewer: {
    id: currentUserId,
    reviewer: currentUserId,
    user: currentUserId,
    status: 'invited',
  },
}

const project = {
  id: faker.random.uuid(),
  title: faker.lorem.sentence(15),
  fragments: [faker.random.uuid()],
  reviewers: [state.reviewer],
}

const version = {
  id: faker.random.uuid(),
  reviewers: [state.reviewer],
}
;<ReviewerItem
  project={project}
  version={version}
  lastSubmittedVersion={version}
  currentUser={currentUser}
  reviewerResponse={(id, status) => setState({ reviewer: { status } })}
/>
```

When the reviewer has accepted the invitation to review, a link to perform their review is displayed.

```js
const currentUserId = 1

const currentUser = {
  id: currentUserId,
}

const reviewer = {
  id: currentUserId,
  reviewer: currentUserId,
  user: currentUserId,
  status: 'accepted',
}

const project = {
  id: faker.random.uuid(),
  title: faker.lorem.sentence(15),
  fragments: [faker.random.uuid()],
  reviewers: [reviewer],
}

const version = {
  id: faker.random.uuid(),
  reviewers: [reviewer],
}
;<ReviewerItem
  project={project}
  version={version}
  lastSubmittedVersion={version}
  currentUser={currentUser}
/>
```

When the reviewer has declined the invitation to review, they can't perform any further actions.

```js
const currentUserId = 1

const currentUser = {
  id: currentUserId,
}

const reviewer = {
  id: currentUserId,
  user: currentUserId,
  reviewer: currentUserId,
  status: 'declined',
}

const project = {
  id: faker.random.uuid(),
  title: faker.lorem.sentence(15),
  fragments: [faker.random.uuid()],
  reviewers: [reviewer],
}

const version = {
  id: faker.random.uuid(),
  reviewers: [reviewer],
}
;<ReviewerItem
  project={project}
  version={version}
  lastSubmittedVersion={version}
  currentUser={currentUser}
/>
```
