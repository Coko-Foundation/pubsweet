A drop-down menu for assigning an editor to a project.

```js
const { JournalProvider } = require('xpub-journal')
const journal = require('../../../config/journal')

const project = {
  id: faker.random.uuid(),
}

const team = {
  members: [],
}

const options = [
  {
    value: faker.random.uuid(),
    label: faker.internet.userName(),
  },
  {
    value: faker.random.uuid(),
    label: faker.internet.userName(),
  },
  {
    value: faker.random.uuid(),
    label: faker.internet.userName(),
  },
]
;<JournalProvider journal={journal}>
  <AssignEditor
    project={project}
    team={team}
    teamName="Senior Editor"
    teamTypeName="seniorEditor"
    options={options}
    addUserToTeam={value => console.log(value)}
  />
</JournalProvider>
```
