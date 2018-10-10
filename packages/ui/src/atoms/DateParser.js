import moment from 'moment'
import propTypes from 'prop-types'
import { compose, withProps, withHandlers, setDisplayName } from 'recompose'

const getDuration = timestamp => {
  const today = moment()
  const stamp = moment(timestamp)
  return moment.duration(today.diff(stamp))
}

const D = ({ children, timestamp, timeAgo }) => children(timestamp, timeAgo)

const DateParser = compose(
  setDisplayName('DateParser'),
  withHandlers({
    renderTimestamp: ({
      timestamp,
      dateFormat = 'DD.MM.YYYY',
      humanizeThreshold = 0,
    }) => () => {
      if (!timestamp) return ''
      const duration = getDuration(timestamp)

      if (duration.asDays() < humanizeThreshold) {
        return `${duration.humanize()} ago`
      }
      return moment(timestamp).format(dateFormat)
    },
    renderTimeAgo: ({ timestamp }) => () => {
      if (!timestamp) return ''
      const duration = getDuration(timestamp)
      return duration.humanize()
    },
  }),
  withProps(({ renderTimestamp, renderTimeAgo }) => ({
    timeAgo: renderTimeAgo(),
    timestamp: renderTimestamp(),
  })),
)(D)

export default DateParser

DateParser.propTypes = {
  /** The date string. Can be any date parsable by momentjs. */
  timestamp: propTypes.oneOfType([propTypes.string, propTypes.number, Date])
    .isRequired,
  /** Format of the rendered date. */
  dateFormat: propTypes.string,
  /** Humanize duration threshold */
  humanizeThreshold: propTypes.number,
}
