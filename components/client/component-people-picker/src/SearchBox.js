import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon, InputWithAddons } from '@pubsweet/ui'
import { media } from '@pubsweet/ui-toolkit'
import { personNamePropType } from './types'

const FlexBox = styled.div`
  box-sizing: border-box;
  display: flex;
  ${media.tabletPortraitUp`
      width: 50%;
  `};
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

  onKeyDown = e => {
    // key code for enter is 13
    // @petereast - KeyboardEvent.charCode is depricated!! https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode
    if (e.key === 'Enter') {
      this.handleSearch()
    }
  }

  render() {
    /**
     * TODO
     * onSuggestionsFetchRequested should be reimplemented
     * once we know how the dropdown should behave
     */
    const { inputOverrideComponent } = this.props
    return (
      <FlexBox>
        {inputOverrideComponent ? (
          inputOverrideComponent({
            onClearHandler: this.clearSearch,
            onSearchHandler: this.handleSearch,
            onChange: this.onChange,
            onKeyPress: this.onKeyDown,
            placeholder: this.props.placeholder || 'Search string here...',
            value: this.state.value,
          })
        ) : (
          <InputWithAddons
            addons={[
              {
                icon: <Icon data-test-id="cross-icon">X</Icon>,
                buttonProps: { onClick: this.clearSearch },
              },
              {
                icon: (
                  <Icon data-test-id="search-icon" reverse>
                    search
                  </Icon>
                ),
                buttonProps: { onClick: this.handleSearch, primary: true },
              },
            ]}
            inputProps={{
              'aria-label': 'Search',
              'data-test-id': 'search-input',
              onChange: this.onChange,
              onKeyDown: this.onKeyDown,
              placeholder: this.props.placeholder || 'Search string here...',
              value: this.state.value,
            }}
          />
        )}
      </FlexBox>
    )
  }
}

SearchBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf(personNamePropType)).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default SearchBox
