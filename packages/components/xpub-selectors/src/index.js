import { orderBy, filter } from 'lodash'

export const newestFirst = items => orderBy(items, ['created'], ['desc'])

export const newestDecidedFirst = items =>
  orderBy(
    filter(
      items,
      data => (data.decision || {}).status === 'submitted',
      ['created'],
      ['desc'],
    ),
  )

export const newestSubmittedFirst = items =>
  orderBy(filter(items, data => !!data.submitted), ['submitted'], ['desc'])

export const selectCurrentUser = state =>
  state.currentUser.isAuthenticated ? state.currentUser.user : null

// TODO: collections should be keyed by id
export const selectCollection = (state, id) =>
  state.collections.find(collection => collection.id === id)

// TODO: there shouldn't be any missing
export const selectFragments = (state, ids) =>
  ids.map(id => state.fragments[id]).filter(fragment => fragment)

export const selectFragment = (state, id) => state.fragments[id]

export const selectCurrentVersion = (state, project) =>
  newestFirst(selectFragments(state, project.fragments))[0]

export const selectLastDecidedVersion = (state, project) =>
  newestDecidedFirst(selectFragments(state, project.fragments))

export const selectLastSubmittedVersion = (state, project) =>
  newestSubmittedFirst(selectFragments(state, project.fragments))

export const getReviewerFromUser = (project, version, currentUser) => {
  if (!project.reviewers || !version.reviewers) return null

  const projectReviewer = project.reviewers.find(
    reviewer => reviewer && reviewer.user === currentUser.id,
  )

  return version.reviewers.find(
    reviewer => reviewer && reviewer.reviewer === projectReviewer.id,
  )
}

export const getUserFromTeam = (version, role) => {
  if (!version.teams) return []

  const teams = version.teams.filter(team => team.role === role)
  return teams.length ? teams[0].members : []
}

export const selectUser = (state, id) =>
  state.users.users.find(user => user.id === id)
