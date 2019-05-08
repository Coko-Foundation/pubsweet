import React from 'react'
import PropTypes from 'prop-types'

import {
  personNamePropType,
  affiliationPropType,
  focusesPropType,
  expertisesPropType,
} from './types'

const PersonInfoModal = ({
  isSelected,
  onAccept,
  onCancel,
  open,
  maxSelection,
  name,
  institution,
  focuses,
  expertises,
  isSelectButtonClickable,
}) => <h2>{name}</h2>

PersonInfoModal.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  maxSelection: PropTypes.number,
  name: personNamePropType.isRequired,
  institution: affiliationPropType.isRequired,
  focuses: focusesPropType.isRequired,
  expertises: expertisesPropType.isRequired,
}

PersonInfoModal.defaultProps = {
  maxSelection: Infinity,
}

export default PersonInfoModal
