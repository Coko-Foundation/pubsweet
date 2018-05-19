import { actions } from 'pubsweet-client'

export const addUserToTeam = ({
  team,
  teamTypeName,
  name,
  group,
  version,
  user,
}) => dispatch => {
  if (team) {
    team.members.push(user)
    return dispatch(actions.updateTeam(team))
  }

  return dispatch(
    actions.createTeam({
      teamType: teamTypeName,
      group,
      name,
      object: {
        type: 'fragment',
        id: version.id,
      },
      members: [user],
    }),
  )
}
