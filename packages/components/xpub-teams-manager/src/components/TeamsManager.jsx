import React from 'react'
import config from 'config'
import { Page } from './molecules/Page'

import Team from './Team'
import TeamCreator from './TeamCreator'

const TeamsManager = ({
  teams = [],
  updateTeam,
  deleteTeam,
  createTeam,
  error,
  users,
  collections,
}) => {
  if (teams && collections && users) {
    return (
      <Page>
        {error ? <div>{error}</div> : null}
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Object</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, key) => (
                <Team
                  delete={deleteTeam}
                  key={team.id}
                  number={key + 1}
                  team={team}
                  update={updateTeam}
                  users={users}
                />
              ))}
            </tbody>
          </table>
          <TeamCreator
            collections={collections}
            create={createTeam}
            types={config.authsome.teams}
          />
        </div>
      </Page>
    )
  }
  return null
}

export default TeamsManager
