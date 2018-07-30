import { get } from 'lodash'

/**
 * A bit of syntactic sugar for styled-components. Lets you replace this:
 *
 * ${props => props.theme.colorPrimary}
 *
 * with this:
 *
 * ${th('colorPrimary')}
 *
 * This is called 'th' (theme helper) for historic reasons
 */
const th = name => props => get(props.theme, name)

/**
 * returns border color from theme object, based on validation status
 */
const borderColor = ({ theme, validationStatus = 'default' }) =>
  ({
    error: theme.colorError,
    success: theme.colorSuccess,
    default: theme.colorBorder,
    warning: theme.colorWarning,
  }[validationStatus])

export { th, borderColor }
