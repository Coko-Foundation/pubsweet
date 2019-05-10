import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
import { Action } from '@pubsweet/ui'

import {
  personNamePropType,
  affiliationPropType,
  expertisesPropType,
  focusesPropType,
} from './types'
import PodContainer from './PodContainer'

const SmallAction = styled(Action)`
  font-size: ${th('fontSizeBaseSmall')};
  line-height: ${th('lineHeightBaseSmall')};
  margin: 3px 0;
`

const CollapsibleBox = styled.div`
  width: 100%;
  min-width: 0;
`
class PersonPod extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  acceptModal = person => {
    this.setState({ isModalOpen: false })
    this.props.togglePersonSelection(person)
  }

  cancelModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    const {
      isSelectButtonClickable = true,
      togglePersonSelection,
      selectButtonType,
      name,
      institution = '',
      focuses,
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
