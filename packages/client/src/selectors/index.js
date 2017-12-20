import { createSelector } from 'reselect'

export const selectCollections = state => state.collections
export const selectTeams = state => state.teams
export const selectUsers = state => state.users.users
export const selectFragments = state => state.fragments

export const selectCollection = createSelector(
  selectCollections,
  (_, { id }) => id,
  (collections, id) => collections.find(collection => collection.id === id),
)

export const selectFragment = createSelector(
  selectFragments,
  (_, { id }) => id,
  (fragments, id) => fragments[id],
)

export const selectTeam = createSelector(
  selectTeams,
  (_, { id }) => id,
  (teams, id) => teams.find(team => team.id === id),
)

export const selectUser = createSelector(
  selectUsers,
  (_, { id }) => id,
  (users, id) => users.find(user => user.id === id),
)

export const selectCurrentUser = state => state.currentUser.user
