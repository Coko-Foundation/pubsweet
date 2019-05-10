import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Button } from '@pubsweet/ui'

const FlexWrapper = styled.div`
  display: flex;
`

const CancelButton = styled(Button)`
  margin-right: calc(${th('gridUnit')} * 3);
`

const PeoplePickerButtons = ({ isValid = false, onCancel, onSubmit }) => (
  <FlexWrapper>
    <CancelButton onClick={onCancel}>Cancel</CancelButton>
    <div>
      <Button
        data-test-id="people-picker-add"
        disabled={!isValid}
        onClick={onSubmit}
        primary
      >
        Add
      </Button>
    </div>
  </FlexWrapper>
)

PeoplePickerButtons.propTypes = {
  isValid: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PeoplePickerButtons.defaultProps = {
  isValid: false,
}

export default PeoplePickerButtons
