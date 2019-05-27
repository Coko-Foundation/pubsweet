import React, { Fragment } from 'react'
import styled from 'styled-components'
import { th, media } from '@pubsweet/ui-toolkit'

import PeoplePickerLogic from './PeoplePickerLogic'
import PeoplePickerButtons from './PeoplePickerButtons'
import PeoplePickerBody from './PeoplePickerBody'
import SearchBox from './SearchBox'

const MainColumn = styled.div`
  box-sizing: border-box;
  flex: 1 1 100%;
  min-width: 0;
  position: relative;
  padding-left: calc(${th('gridUnit')}* 2);
  padding-right: calc(${th('gridUnit')} * 2);
  width: 100%;
  ${media.tabletPortraitUp`
    width: 50%;
  `};
  ${media.tabletLandscapeUp`
    width: 33%;
    margin-left: 16.666%;
    margin-right: 16.666%;
    padding-left: ${th('gridUnit')};
    padding-right: ${th('gridUnit')};
  `};
`

const SearchBoxContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  margin-left: calc(-${th('gridUnit')} * 2);
  margin-right: calc(-${th('gridUnit')} * 2);
`

const BodyContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  margin-bottom: calc(${th('gridUnit')} * 20);
  margin-left: calc(-${th('gridUnit')} * 2);
  margin-right: calc(-${th('gridUnit')} * 2);
`

const PeoplePickerLayout = ({
  modalTitle,
  inputOverrideComponent,
  ...props
}) => (
  <Fragment>
    <PeoplePickerLogic {...props}>
      {innerProps => (
        <React.Fragment>
          <SearchBoxContainer>
            <MainColumn>
              <SearchBox
                filterFunction={innerProps.filterFunction}
                inputOverrideComponent={inputOverrideComponent}
                onSubmit={innerProps.searchSubmit}
                options={innerProps.searchOptions}
                placeholder={props.searchBoxPlaceholder}
              />
            </MainColumn>
          </SearchBoxContainer>
          <BodyContainer data-test-id="people-picker-body">
            <MainColumn>
              <PeoplePickerBody {...innerProps} />
            </MainColumn>
          </BodyContainer>
          <PeoplePickerButtons {...innerProps} />
        </React.Fragment>
      )}
    </PeoplePickerLogic>
  </Fragment>
)

export default PeoplePickerLayout
