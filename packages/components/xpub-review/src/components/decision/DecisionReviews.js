import React from 'react'
// import { getUserFromTeam } from 'xpub-selectors'
import DecisionReview from './DecisionReview'

// TODO: read reviewer ordinal and name from project reviewer
// const { status } =
//     getUserFromTeam(manuscript, 'reviewerEditor').filter(
//       member => member.user.id === currentUser.id,
//     )[0] || {}
//   return status
const getCompletedReviews = (manuscript, currentUser) => {
  const team =
    manuscript.teams.find(team => team.teamType === 'reviewerEditor') || {}
  const { status } =
    (team.status || []).filter(member => member.user === currentUser.id)[0] ||
    {}
  return status
}

const DecisionReviews = ({ manuscript }) => (
  <div>
    {manuscript.reviews &&
      manuscript.reviews
        .filter(
          review =>
            getCompletedReviews(manuscript, review.user) === 'completed' &&
            review.isDecision === false,
        )
        .map((review, index) => (
          <div key={review.id}>
            <DecisionReview
              open
              review={review}
              reviewer={{
                name: review.user.username,
                ordinal: index + 1,
              }}
            />
          </div>
        ))}
  </div>
)

export default DecisionReviews
