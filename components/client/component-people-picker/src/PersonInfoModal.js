import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { H2, Button } from '@pubsweet/ui'

import {
  personNamePropType,
  affiliationPropType,
  focusesPropType,
  expertisesPropType,
} from './types'

const StyledH2 = styled(H2)`
  margin-bottom: 0;
`

const Root = styled.div`
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 400px;
`

const Buttons = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  button {
    height: 40px;
    min-width: 120px;
  }
`

const BaseParagraph = styled.p`
  font-family: ${th('fontWriting')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th(`lineHeightBase`)};

  margin-top: 0;
  margin-bottom: calc(${th('gridUnit')} * 4);

  &:last-child {
    margin-bottom: 0;
  }
`
const SmallParagraph = styled(BaseParagraph)`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th(`lineHeightBaseSmall`)};
`

const StyledSmallParagraph = styled(SmallParagraph)`
  margin-bottom: calc(${th('gridUnit')} * 6);
  color: ${th('colorTextSecondary')};
`

const ErrorParagraph = styled(StyledSmallParagraph)`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th(`lineHeightBaseSmall`)};
  margin-bottom: calc(${th('gridUnit')} * 6);
  color: ${th('colorError')};
`

const PersonInfoModal = ({
  hideModal,
  isSelected,
  onAccept,
  maxSelection,
  name,
  institution,
  focuses = [],
  expertises = [],
  isSelectButtonClickable,
}) => (
  <Root>
    <StyledH2>{name}</StyledH2>
    <BaseParagraph>{institution}</BaseParagraph>
    <SmallParagraph>Expertise: {expertises.join(', ')}</SmallParagraph>
    <StyledSmallParagraph secondary>
      Research focuses: {focuses.join(', ')}
    </StyledSmallParagraph>
    {!isSelectButtonClickable && (
      <ErrorParagraph data-test-id="maximum-people-selected-error">
        Maximum {maxSelection} already selected
      </ErrorParagraph>
    )}
    <Buttons>
      <Button data-test-id="cancel" onClick={hideModal} type="button">
        Cancel
      </Button>
      <Button
        data-test-id="accept"
        onClick={() => {
          onAccept()
          hideModal()
        }}
        primary
        type="button"
      >
        {isSelected ? 'Remove editor' : 'Add editor'}
      </Button>
    </Buttons>
  </Root>
)

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
