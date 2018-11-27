import { compose, withHandlers } from 'recompose'
import { cloneDeep } from 'lodash'
import { withFormik } from 'formik'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import ReviewerForm from './ReviewerForm'

const createTeamMutation = gql`
  mutation($input: TeamInput!) {
    createTeam(input: $input) {
      id
      type
      teamType
      name
      object {
        objectId
        objectType
      }
      members {
        id
        username
      }
    }
  }
`

const updateTeamMutation = gql`
  mutation($id: ID, $input: TeamInput) {
    updateTeam(id: $id, input: $input) {
      id
      type
      teamType
      name
      object {
        objectId
        objectType
      }
      members {
        id
        username
      }
    }
  }
`

const query = gql`
  query {
    teams {
      id
      teamType
      name
      object {
        objectId
        objectType
      }
      members {
        id
      }
      status {
        user
        status
      }
    }
  }
`

const update = (
  proxy,
  { data: { updateTeamMutation, createTeamMutation, teams } },
) => {
  const data = proxy.readQuery({ query })
  if (updateTeamMutation) {
    const teamIndex = teams.findIndex(team => team.id === updateTeamMutation.id)
    data[teamIndex] = updateTeamMutation
  }

  if (createTeamMutation) {
    data.push(createTeamMutation)
  }

  proxy.writeQuery({ query, data })
}

const handleSubmit = (
  { user },
  { props: { manuscript, updateTeamMutation, createTeamMutation } },
) => {
  const team =
    manuscript.teams.find(team => team.teamType === 'reviewerEditor') || {}

  const teamAdd = {
    object: {
      objectId: manuscript.id,
      objectType: 'Manuscript',
    },
    status: [{ user: user.id, status: 'invited' }],
    name: 'Reviewer Editor',
    teamType: 'reviewerEditor',
    members: [user.id],
  }
  if (team.id) {
    const newTeam = cloneDeep(team)
    newTeam.status.push({ user: user.id, status: 'invited' })
    newTeam.members.push(user.id)
    updateTeamMutation({
      variables: {
        id: team.id,
        input: newTeam,
      },
      update,
    })
  } else {
    createTeamMutation({
      variables: {
        input: teamAdd,
      },
      update,
    })
  }
}

const loadOptions = props => input => {
  const options = props.reviewerUsers

  return Promise.resolve({ options })
}

export default compose(
  graphql(createTeamMutation, { name: 'createTeamMutation' }),
  graphql(updateTeamMutation, { name: 'updateTeamMutation' }),
  withHandlers({
    loadOptions: props => loadOptions(props),
  }),
  withFormik({
    mapPropsToValues: () => ({ user: '' }),
    displayName: 'reviewers',
    handleSubmit,
  }),
)(ReviewerForm)
