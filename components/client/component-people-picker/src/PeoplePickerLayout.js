import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@rebass/grid'

import PeoplePickerLogic from './PeoplePickerLogic'
import PeoplePickerButtons from './PeoplePickerButtons'
import PeoplePickerBody from './PeoplePickerBody'
import SearchBox from './SearchBox'

const MainColumn = styled(Box).attrs({ mx: [0, 0, 0, '16.666%'] })`
  flex: 1 1 100%;
  min-width: 0;
  position: relative;
`

const PeoplePickerLayout = ({
  modalTitle,
  inputOverrideComponent,
  ...props
}) => (
  <PeoplePickerLogic {...props}>
    {innerProps => (
      <React.Fragment>
        <Flex mx={-2}>
          <Box
            mx={[0, 0, 0, '16.666%']}
            px={[2, 2, 2, 1]}
            width={[1, 1, 1 / 2, 0.33]}
          >
            <SearchBox
              filterFunction={innerProps.filterFunction}
              inputOverrideComponent={inputOverrideComponent}
              onSubmit={innerProps.searchSubmit}
              options={innerProps.searchOptions}
              placeholder={props.searchBoxPlaceholder}
            />
          </Box>
        </Flex>
        <Flex data-test-id="people-picker-body">
          <MainColumn mb={7}>
            <PeoplePickerBody {...innerProps} />
          </MainColumn>
        </Flex>
        <PeoplePickerButtons {...innerProps} />
      </React.Fragment>
    )}
  </PeoplePickerLogic>
)

export default PeoplePickerLayout
