import { get } from 'lodash'

/**
 * Returns multiples of gridUnit.
 *
 * It lets you replace statements like this:
 *    calc(${th('gridUnit')} * 4)
 * to this:
 *    ${grid(4)}
 *
 */
const grid = value => props => `calc(${props.theme.gridUnit} * ${value})`

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
 * returns color from theme object, based on validation status
 */
const validationColor = ({ theme, validationStatus = 'default' }) =>
  ({
    error: theme.colorError,
    success: theme.colorSuccess,
    default: theme.colorBorder,
    warning: theme.colorWarning,
  }[validationStatus])

export { grid, th, validationColor }
