module.exports = {
  frontend: {
    components: [() => require('./components')],
    actions: () => ({
      makeDecision: require('./redux/MakeDecision').makeDecision,
      inviteReviewer: require('./redux/InviteReviewer').makeInvitation,
    }),
    reducers: {
      makeDecision: () => require('./redux/MakeDecision').default,
      inviteReviewer: () => require('./redux/InviteReviewer').default,
    },
  },
}
