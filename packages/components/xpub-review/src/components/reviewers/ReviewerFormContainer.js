import { compose, withHandlers } from 'recompose'
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

const handleSubmit = (manuscript, { props }) => {
  const team = manuscript.teams.find(team => team.teamType === 'reviewerEditor')

  if (team.id) {
    props.updateTeamMutation({
      variables: {
        id: team.id,
        input: team,
      },
    })
  } else {
    props.createTeamMutation({
      variables: {
        input: team,
      },
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
    initialValues: {},
    mapPropsToValues: ({ manuscript }) => manuscript,
    displayName: 'reviewers',
    handleSubmit,
  }),
)(ReviewerForm)
