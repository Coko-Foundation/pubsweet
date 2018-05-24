import moment from 'moment'
import propTypes from 'prop-types'
import { compose, withProps, withHandlers, setDisplayName } from 'recompose'

const getDuration = timestamp => {
  const today = moment()
  const stamp = moment(timestamp)
  return moment.duration(today.diff(stamp))
}

const D = ({ children, timestamp, daysAgo }) => children(timestamp, daysAgo)

const DateParser = compose(
  setDisplayName('DateParser'),
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
)(D)

export default DateParser

DateParser.propTypes = {
  /** The date string. Can be any date parsable by momentjs. */
  timestamp: propTypes.oneOf([propTypes.string, propTypes.instanceOf(Date)])
    .isRequired,
  /** Format of the rendered date. */
  dateFormat: propTypes.string,
}
