// import { compose, withProps } from 'recompose'
// import { graphql } from '@apollo/react-hoc'
// import { withLoader } from 'pubsweet-client'

// import config from 'config'
// import queries from '../graphql/queries/'
// import mutations from '../graphql/mutations/'
// import Dashboard from './Dashboard'
// import upload from '../lib/upload'

// const { acceptUploadFiles } = config['pubsweet-component-xpub-dashboard'] || {}

// const acceptFiles =
//   acceptUploadFiles.length > 0
//     ? acceptUploadFiles.join()
//     : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

// const updateReviewer = (proxy, { data: { reviewerResponse } }) => {
//   const id = reviewerResponse.object.objectId
//   const data = proxy.readQuery({
//     query: queries.dashboard,
//     variables: {
//       id,
//     },
//   })

//   const manuscriptIndex = data.journals.manuscripts.findIndex(
//     manu => manu.id === id,
//   )
//   const teamIndex = data.journals.manuscripts[manuscriptIndex].teams.findIndex(
//     team => team.id === reviewerResponse.id,
//   )

//   data.journals.manuscripts[manuscriptIndex].teams[teamIndex] = reviewerResponse

//   proxy.writeQuery({ query: queries.dashboard, data })
// }

// export default compose(
//   graphql(queries.dashboard, {
//     props: data => data,
//   }),
//   graphql(mutations.reviewerResponseMutation, {
//     props: ({ mutate }) => ({
//       reviewerResponse: (currentUserId, action, teamId) =>
//         mutate({
//           variables: { currentUserId, action, teamId },
//           update: updateReviewer,
//         }),
//     }),
//   }),
//   graphql(mutations.deleteManuscriptMutation, {
//     props: ({ mutate }) => ({
//       deleteManuscript: manuscript =>
//         mutate({ variables: { id: manuscript.id } }),
//     }),
//     options: {
//       update: (proxy, { data: { deleteManuscript } }) => {
//         const data = proxy.readQuery({ query: queries.dashboard })
//         const manuscriptIndex = data.journals.manuscripts.findIndex(
//           manuscript => manuscript.id === deleteManuscript,
//         )
//         if (manuscriptIndex > -1) {
//           data.journals.manuscripts.splice(manuscriptIndex, 1)
//           proxy.writeQuery({ query: queries.dashboard, data })
//         }
//       },
//     },
//   }),
//   withLoader(),
//   withProps(({ journals, currentUser }) => ({
//     dashboard: (journals || {}).manuscripts || [],
//     journals,
//     currentUser,
//     acceptFiles,
//   })),
//   upload,
// )(Dashboard)
