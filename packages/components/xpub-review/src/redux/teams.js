import { actions } from 'pubsweet-client'

export const addUserToTeam = ({
  team,
  teamTypeName,
  name,
  group,
  project,
  user,
}) => dispatch => {
  if (team) {
    team.members = [user]
    return dispatch(actions.updateTeam(team))
  }

  return dispatch(
    actions.createTeam({
      teamType: teamTypeName,
      group,
      name,
      object: {
        type: 'collection',
        id: project.id,
      },
      members: [user],
    }),
  )
}
