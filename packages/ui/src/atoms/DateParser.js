import moment from 'moment'
import { compose, withProps, withHandlers } from 'recompose'

const getDuration = timestamp => {
  const today = moment()
  const stamp = moment(timestamp)
  return moment.duration(today.diff(stamp))
}

const Date = ({ children, timestamp, daysAgo }) => children(timestamp, daysAgo)

export default compose(
  withHandlers({
    renderTimestamp: ({ timestamp, dateFormat = 'DD.MM.YYYY' }) => () => {
      if (!timestamp) return ''
      const duration = getDuration(timestamp)

      if (duration.asDays() < 1) {
        return `${duration.humanize()}`
      }
      return moment(timestamp).format(dateFormat)
    },
    renderDaysAgo: ({ timestamp }) => () => {
      if (!timestamp) return ''
      const duration = getDuration(timestamp)
      return duration.humanize()
    },
  }),
  withProps(({ renderTimestamp, renderDaysAgo }) => ({
    daysAgo: renderDaysAgo(),
    timestamp: renderTimestamp(),
  })),
)(Date)
