import { compose, withProps } from 'recompose'
import { withFormik } from 'formik'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-client-preset'
import { withLoader } from 'pubsweet-client'
import { cloneDeep, omit } from 'lodash'

import Reviewers from '../components/reviewers/Reviewers'
import ReviewerContainer from '../components/reviewers/ReviewerContainer'

const teamFields = `
  id
  role
  teamType
  name
  object {
    objectId
    objectType
  }
  objectType
  members {
    id
    username
  }
  status {
    user
    status
  }
`

const fragmentFields = `
  id
  created
  files {
    id
    created
    label
    filename
    mimeType
    fileType
    size
    url
  }
  reviews {
    open
    recommendation
    created
    comments {
      type
      content
      files {
        fileType
        id
        label
        url
        filename
      }
    }
    user {
      id
      username
    }
  }
  decision
  teams {
    ${teamFields}
  }
  status
`

const createTeamMutation = gql`
  mutation($input: TeamInput!) {
    createTeam(input: $input) {
      ${teamFields}
    }
  }
`

const updateTeamMutation = gql`
  mutation($id: ID, $input: TeamInput) {
    updateTeam(id: $id, input: $input) {
      ${teamFields}
    }
  }
`

const query = gql`
  query($id: ID!) {
    currentUser {
      id
      username
      admin
    }

    users {
      id
      username
      admin
    }

    teams {
      ${teamFields}
    }

    manuscript(id: $id) {
      ${fragmentFields}
    }
  }
`

const update = match => (proxy, { data: { updateTeam, createTeam } }) => {
  const data = proxy.readQuery({
    query,
    variables: {
      id: match.params.version,
    },
  })

  if (updateTeam) {
    const teamIndex = data.teams.findIndex(team => team.id === updateTeam.id)
    const manuscriptTeamIndex = data.manuscript.teams.findIndex(
      team => team.id === updateTeam.id,
    )
    data.teams[teamIndex] = updateTeam
    data.manuscript.teams[manuscriptTeamIndex] = updateTeam
  }

  if (createTeam) {
    data.teams.push(createTeam)
    data.manuscript.teams.push(createTeam)
  }
  proxy.writeQuery({ query, data })
}

const handleSubmit = (
  { user },
  { props: { manuscript, updateTeamMutation, createTeamMutation, match } },
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
    const newTeam = {
      object: omit(team.object, ['__typename']),
      status: team.status.map(status => omit(status, ['__typename'])),
      name: team.name,
      teamType: team.teamType,
      members: cloneDeep(team.members).map(member => member.id),
    }

    newTeam.members.push(user.id)
    newTeam.status.push({ user: user.id, status: 'invited' })
    updateTeamMutation({
      variables: {
        id: team.id,
        input: newTeam,
      },
      update: update(match),
    })
  } else {
    createTeamMutation({
      variables: {
        input: teamAdd,
      },
      update: update(match),
    })
  }
}

export default compose(
  graphql(query, {
    options: ({ match }) => ({
      variables: {
        id: match.params.version,
      },
    }),
  }),
  graphql(createTeamMutation, { name: 'createTeamMutation' }),
  graphql(updateTeamMutation, { name: 'updateTeamMutation' }),
  withLoader(),
  withProps(
    ({
      manuscript,
      teams = [],
      users,
      match: {
        params: { journal },
      },
    }) => {
      const reviewerTeams =
        teams.find(
          team =>
            team.teamType === 'reviewerEditor' &&
            team.object.objectId === manuscript.id &&
            team.object.objectType === 'Manuscript',
        ) || {}

      // Temporary solution until new Team model is back
      const mem = cloneDeep(reviewerTeams.members || [])
      mem.map(member => {
        const status = reviewerTeams.status.find(
          status => status.user === member.id,
        )
        member.status = (status || {}).status
        return member
      })
      return {
        reviewers: mem || [],
        journal: { id: journal },
        reviewerUsers: users,
        Reviewer: ReviewerContainer,
      }
    },
  ),
  // withHandlers({
  //   loadOptions: props => props.reviewerUsers, // loadOptions(props),
  // }),
  withFormik({
    mapPropsToValues: () => ({ user: '' }),
    displayName: 'reviewers',
    handleSubmit,
  }),
)(Reviewers)
