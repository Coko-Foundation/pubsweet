import { connect } from 'react-redux'
import { compose } from 'recompose'
import AssignEditor from './AssignEditor'
import { addUserToTeam } from '../../redux/teams'

const editorOption = user => ({
  label: user.username, // TODO: name
  value: user.id,
})

export default compose(
  connect(
    (state, { version, teamTypeName }) => ({
      options:
        state.users &&
        !state.users.isFetching &&
        state.users.users
          // .filter(user => user.roles.includes(teamType)) // TODO
          .map(editorOption),
      team:
        state.teams &&
        state.teams.find(
          team =>
            team.object.type === 'fragment' &&
            team.object.id === version.id &&
            team.teamType === teamTypeName,
        ),
    }),
    {
      addUserToTeam,
    },
  ),
)(AssignEditor)
