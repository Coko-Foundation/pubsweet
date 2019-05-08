import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex } from '@rebass/grid'
import { th } from '@pubsweet/ui-toolkit'
import { Button, TextField } from '@pubsweet/ui'
import Icon from './Icon'
import CrossIconButton from './CrossIconButton'
import { personNamePropType } from './types'

const SearchIcon = props => (
  <Icon
    iconName="Search"
    overrideName="@pubsweet-pending.PeoplePicker.Search"
    {...props}
  />
)

const StyledSearchButton = styled(Button).attrs({
  primary: true,
})`
  border-radius: 0 ${th('borderRadius')} ${th('borderRadius')} 0;
  fill: ${th('colorTextReverse')};
  line-height: 0;
  min-width: 0;
  width: ${th('space.5')};
  padding: ${th('space.1')};
  margin: 0;
`

const StyledClearButton = styled(CrossIconButton)`
  fill: ${th('colorTextSecondary')};
  width: ${th('space.5')};
  border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
  border-left: ${th('colorBackground')};
  &:focus {
    border-left: ${th('colorBorder')};
  }
`

class SearchBox extends React.Component {
  state = {
    value: '',
    suggestions: [],
  }

  getSuggestionValue = suggestion => this.state.value

  clearSearch = event => {
    this.setState(
      {
        value: '',
      },
      () => this.handleSearch(),
    )
  }

  handleSearch = event => {
    this.props.onSubmit(this.state.value)
  }

  handleSearchStringChange = e => {
    this.setState({ value: e.target.value })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    let suggestions = []
    if (inputLength !== 0) {
      suggestions = this.props.filterFunction(
        this.props.options,
        inputValue,
        'value',
      )
    }
    this.setState({
      suggestions,
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  onSuggestionSelected = (_, { suggestion }) => {
    this.setState(
      {
        value: suggestion.value,
      },
      () => this.handleSearch(),
    )
  }

  onChange = (_, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  onKeyDown = event => {
    // key code for enter is 13
    if (event.keyCode === 13) {
      this.handleSearch()
    }
  }

  renderSuggestion = suggestion => {
    const inputValue = this.state.value.trim().toLowerCase()
    const matchIndex = this.props.getMatchIndex(inputValue, suggestion.value)
    if (matchIndex < 0) {
      // this shouldn't happen/error
      return ''
    }
    const beforeMatch = suggestion.value.slice(0, matchIndex)
    const matched = suggestion.value.slice(
      matchIndex,
      matchIndex + inputValue.length,
    )
    const afterMatch = suggestion.value.slice(matchIndex + inputValue.length)
    return (
      <div>
        {beforeMatch}
        <b>{matched}</b>
        {afterMatch}
      </div>
    )
  }

  render() {
    /**
     * TODO
     * onSuggestionsFetchRequested should be reimplemented
     * once we know how the dropdown should behave
     */
    return (
      <Flex>
        <TextField
          onChange={this.handleSearchStringChange}
          onKeyDown={this.onKeyDown}
          placeholder={this.props.placeholder || 'Search string here...'}
          value={this.state.value}
        />

        <StyledClearButton onClick={this.clearSearch} />
        <StyledSearchButton onClick={this.handleSearch}>
          <SearchIcon />
        </StyledSearchButton>
      </Flex>
    )
  }
}

SearchBox.propTypes = {
  filterFunction: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf(personNamePropType)).isRequired,
  onSubmit: PropTypes.func.isRequired,
  getMatchIndex: PropTypes.func.isRequired,
}

export default SearchBox
