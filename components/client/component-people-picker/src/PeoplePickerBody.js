import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, media } from '@pubsweet/ui-toolkit'
import SelectedItem from './SelectedItem'

import { peoplePropType } from './types'
import PersonPodGrid from './PersonPodGrid'

const SelectedItemsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const SelectedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${th('gridUnit')};
  ${media.tabletPortraitUp`
    justify-content: space-between;
    flex-direction: row;
  `};
`

const StyledBox = styled.div`
  margin-right: ${th('gridUnit')};
`

const SelectedItems = ({ selection, onCloseClick }) => (
  <SelectedItemsGrid>
    {selection.map(person => (
      <StyledBox key={person.id}>
        <SelectedItem
          label={person.name}
          onCloseClick={() => {
            onCloseClick(person)
          }}
        />
      </StyledBox>
    ))}
  </SelectedItemsGrid>
)

const MessageWrapper = styled.div`
  ${media.tabletPortraitUp`
    position: absolute;
    top: calc(-${th('gridUnit')} * 7);
    right: calc(${th('gridUnit')} * 2);
  `};
`
const SuccessMessage = styled(MessageWrapper)`
  color: ${th('colorSuccess')};
`

const SelectionHint = ({ selection, minSelection, maxSelection }) => {
  const selectionLength = selection.length
  if (selectionLength < minSelection) {
    const numRequired = minSelection - selectionLength
    return (
      <MessageWrapper>
        {numRequired} more suggestion
        {numRequired === 1 ? '' : 's'} required
      </MessageWrapper>
    )
  }
  if (selectionLength >= maxSelection) {
    return <SuccessMessage>Maximum {maxSelection} choices</SuccessMessage>
  }
  return null
}

const PeoplePickerBody = ({
  isSelected,
  maxSelection,
  minSelection,
  people,
  selection,
  toggleSelection,
  ...props
}) => (
  <React.Fragment>
    <SelectedContainer>
      <SelectedItems onCloseClick={toggleSelection} selection={selection} />
      <SelectionHint
        maxSelection={maxSelection}
        minSelection={minSelection}
        selection={selection}
      />
    </SelectedContainer>
    <PersonPodGrid
      isSelected={isSelected}
      maxSelection={maxSelection}
      people={people}
      selection={selection}
      toggleSelection={toggleSelection}
    />
  </React.Fragment>
)

SelectedItems.propTypes = {
  selection: peoplePropType.isRequired,
  onCloseClick: PropTypes.func.isRequired,
}

SelectionHint.propTypes = {
  selection: peoplePropType.isRequired,
  maxSelection: PropTypes.number.isRequired,
  minSelection: PropTypes.number.isRequired,
}

PeoplePickerBody.propTypes = {
  isSelected: PropTypes.func.isRequired,
  maxSelection: PropTypes.number.isRequired,
  minSelection: PropTypes.number.isRequired,
  people: peoplePropType.isRequired,
  selection: peoplePropType.isRequired,
  toggleSelection: PropTypes.func.isRequired,
}

export default PeoplePickerBody
