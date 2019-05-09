import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@rebass/grid'
import { Icon, InputWithAddons } from '@pubsweet/ui'
import { personNamePropType } from './types'

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
        <InputWithAddons
          addons={[
            {
              icon: <Icon>X</Icon>,
              buttonProps: { onClick: this.clearSearch },
            },
            {
              icon: <Icon>search</Icon>,
              buttonProps: { onClick: this.handleSearch, primary: true },
            },
          ]}
          inputProps={{
            'aria-label': 'Search',
            onChange: this.onChange,
            onKeyPress: this.onKeyDown,
            placeholder: this.props.placeholder || 'Search string here...',
            value: this.state.value,
          }}
        />
      </Flex>
    )
  }
}

SearchBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf(personNamePropType)).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SearchBox
