import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Action, Modal, ModalProvider, Icon } from '@pubsweet/ui'
import PersonInfoModal from './PersonInfoModal'

import {
  personNamePropType,
  affiliationPropType,
  expertisesPropType,
  focusesPropType,
} from './types'
import PodContainer from './PodContainer'

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const SmallAction = styled(Action)`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  margin: 3px 0;
`

const CollapsibleBox = styled.div`
  width: 100%;
  min-width: 0;
`
const ButtonAsIconWrapper = styled.button.attrs(() => ({
  type: 'button',
}))`
  background-color: transparent;
  border: none;
  line-height: 0;
  padding: 0;
`

const InfoIcon = props => <Icon {...props}>Info</Icon>

const StyledInfoIcon = styled(InfoIcon)`
  > svg {
    margin-right: 6px;
    height: 18px;
    width: 18px;
    fill: ${th('colorPrimary')};
    stroke: #fff;
  }
`

const StyledSmallParagraph = styled.p`
  font-family: ${th('fontWriting')};
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th(`lineHeightBaseSmall`)};

  margin-top: 3px;
  margin-bottom: calc(${th('gridUnit')} * 4);

  &:last-child {
    margin-bottom: 0;
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${th('colorTextSecondary')};
`

class PersonPod extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }
  }

  acceptModal = person => {
    this.props.togglePersonSelection(person)
  }

  render() {
    const {
      isSelectButtonClickable = true,
      togglePersonSelection,
      selectButtonType,
      maxSelection,
      name,
      institution = '',
      focuses,
      isSelected,
      expertises,
      isKeywordClickable,
      onKeywordClick = null,
    } = this.props

    // eslint-disable-next-line no-unused-vars
    let keywordList
    const keywords = [].concat(focuses).concat(expertises)
    if (isKeywordClickable) {
      keywordList = keywords.map(keyword => (
        <SmallAction
          data-test-id="clickable-keyword"
          key={keyword}
          onClick={() => onKeywordClick(keyword)}
        >
          {keyword}
        </SmallAction>
      ))
    } else {
      keywordList = keywords.map(keyword => (
        <span data-test-id="non-clickable-keyword" key={keyword}>
          {keyword}
        </span>
      ))
    }

    const separatedKeywords = keywordList.reduce(
      (accu, elem) => (accu === null ? [elem] : [...accu, ', ', elem]),
      null,
    )

    return (
      <React.Fragment>
        <PodContainer
          isSelectButtonClickable={isSelectButtonClickable}
          selectButtonType={selectButtonType}
          togglePersonSelection={togglePersonSelection}
        >
          <CollapsibleBox m={2}>
            <p>{name}</p>
            {institution && <p>{institution}</p>}
            <FlexDiv>
              <ModalProvider>
                <Modal
                  component={PersonInfoModal}
                  dismissable
                  expertises={expertises}
                  focuses={focuses}
                  institution={institution}
                  isSelectButtonClickable={isSelectButtonClickable}
                  isSelected={isSelected}
                  maxSelection={maxSelection}
                  name={name}
                  onAccept={this.acceptModal}
                >
                  {showModal => (
                    <ButtonAsIconWrapper
                      data-test-id="people-picker-info"
                      onClick={showModal}
                    >
                      <StyledInfoIcon />
                    </ButtonAsIconWrapper>
                  )}
                </Modal>
              </ModalProvider>
              <StyledSmallParagraph>{separatedKeywords}</StyledSmallParagraph>
            </FlexDiv>
          </CollapsibleBox>
        </PodContainer>
      </React.Fragment>
    )
  }
}

PersonPod.propTypes = {
  isSelectButtonClickable: PropTypes.bool,
  togglePersonSelection: PropTypes.func.isRequired,
  selectButtonType: PropTypes.oneOf(['add', 'remove', 'selected']).isRequired,
  name: personNamePropType.isRequired,
  institution: affiliationPropType,
  focuses: focusesPropType,
  expertises: expertisesPropType,
  isKeywordClickable: PropTypes.bool.isRequired,
  onKeywordClick: PropTypes.func,
  isStatusShown: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  // status should be moved into types.js if/when this information is added to the people endpoint
  status: PropTypes.string,
}

PersonPod.defaultProps = {
  isSelectButtonClickable: true,
  institution: '',
  focuses: [],
  expertises: [],
  onKeywordClick: null,
  isStatusShown: false,
  status: '',
}

export default PersonPod
