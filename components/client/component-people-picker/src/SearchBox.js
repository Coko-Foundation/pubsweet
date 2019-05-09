import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { th } from '@pubsweet/ui-toolkit'
import { Button, TextField, Icon } from '@pubsweet/ui'
import { personNamePropType } from './types'

const StyledSearchButton = styled(Button).attrs({
  primary: true,
})`
  border-radius: 0 ${th('borderRadius')} ${th('borderRadius')} 0;
  fill: ${th('colorTextReverse')};
  width: ${th('space.5')};
  padding: ${th('space.1')};
  margin: 0;
`

const StyledClearButton = styled(Button)`
  fill: ${th('colorTextSecondary')};
  width: ${th('space.5')};
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-left: ${th('colorBackground')};
  border-right: transparent;
  border-radius: 0px;
  padding: 0;
  &:focus {
    border-left: ${th('colorBorder')};
  }
`

const StyledSearchInput = styled(TextField)`
  margin-bottom: 0;
  input {
    border-right: transparent;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`

class SearchBox extends React.Component {
  state = {
    value: '',
    suggestions: [],
  }

  clearSearch = event => {
    this.setState(
      {
        value: '',
      },
      () => this.handleSearch(),
    )
  }

  handleSearch = () => {
    this.props.onSubmit(this.state.value)
  }

  onChange = e => {
    this.setState({ value: e.target.value })
  }

  onKeyDown = event => {
    // key code for enter is 13
    if (event.charCode === 13) {
      this.handleSearch()
    }
  }

  render() {
    /**
     * TODO
     * onSuggestionsFetchRequested should be reimplemented
     * once we know how the dropdown should behave
     */
    return (
      <Flex>
        <StyledSearchInput
          aria-label="Search"
          onChange={this.onChange}
          onKeyPress={this.onKeyDown}
          placeholder={this.props.placeholder || 'Search string here...'}
          value={this.state.value}
        />

        <StyledClearButton onClick={this.clearSearch}>
          <Icon>X</Icon>
        </StyledClearButton>
        <StyledSearchButton onClick={this.handleSearch}>
          <Icon>search</Icon>
        </StyledSearchButton>
      </Flex>
    )
  }
}

SearchBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf(personNamePropType)).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SearchBox
