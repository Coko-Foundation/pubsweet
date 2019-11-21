import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'

// TODO: separate tags when pasted
// TODO: allow tags to be edited

// react-tag-autocomplete expects classnames on these keys
const classNames = {
  root: 'react-tags',
  rootFocused: 'is-focused',
  selected: 'react-tags__selected',
  selectedTag: 'react-tags__selected-tag',
  selectedTagName: 'react-tags__selected-tag-name',
  search: 'react-tags__search',
  searchInput: 'react-tags__search-input',
  suggestions: 'react-tags__suggestions',
  suggestionActive: 'is-active',
  suggestionDisabled: 'is-disabled',
}

class TagsUnstyled extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tags: props.value || [],
    }
  }

  handleDelete = index => {
    const { tags } = this.state

    tags.splice(index, 1)

    this.setState({ tags })

    this.props.onChange(tags)
  }

  handleAddition = tag => {
    const { tags } = this.state

    tags.push(tag)

    this.setState({ tags })

    this.props.onChange(tags)
  }

  render() {
    const { tags } = this.state
    const {
      className: fromStyledWrapper,
      name,
      suggestions,
      placeholder,
    } = this.props

    return (
      <div className={fromStyledWrapper}>
        <ReactTags
          allowNew
          autofocus={false}
          // TODO: enable these when react-tag-autocomplete update is released
          // delimiters={[]}
          // delimiterChars={[',', ';']}
          classNames={classNames}
          handleAddition={this.handleAddition}
          handleDelete={this.handleDelete}
          name={name}
          placeholder={placeholder}
          suggestions={suggestions}
          tags={tags}
        />
      </div>
    )
  }
}

const realBorder = (color, colorBack) => `
  background: linear-gradient(
      ${colorBack} 0,
      ${colorBack} 1.2em,
      ${color} 1.2em,
      ${color} 1.25em,
      ${colorBack} 1.25em,
      ${colorBack} 2em
    )
    no-repeat;
  text-shadow: 0.05em 0.05em 0 ${colorBack}, -0.05em -0.05em 0 ${colorBack},
    -0.05em 0.05em 0 ${colorBack}, 0.05em -0.05em 0 ${colorBack};
`

const Tags = styled(TagsUnstyled)`
  .${classNames.root} {
    /* clicking anywhere will focus the input */
    cursor: text;
    padding: ${th('gridUnit')} 0 0 ${th('gridUnit')};
    position: relative;
  }

  .${classNames.root}.${classNames.rootFocused} {
    border-color: ${th('colorPrimary')};
  }

  .${classNames.selected} {
    display: inline;
  }

  .${classNames.selectedTag} {
    border: 0;
    cursor: pointer;
    display: inline-block;
    font-family: ${th('fontReading')};

    /* match the font styles */
    margin: 0 ${th('gridUnit')} calc(${th('gridUnit')} * 3) 0;
    padding: 0.1em 0.3em;

    ${props =>
      realBorder(props.theme.colorBorder, props.theme.colorBackground)};
  }

  .${classNames.selectedTag}::after {
    color: ${th('colorBorder')};
    content: '\\2715';
    display: inline-block;
    font-size: ${th('fontSizeBaseSmall')};
    font-weight: 600;
    line-height: ${th('lineHeightBaseSmall')};
    margin-left: ${th('gridUnit')};
    padding: ${th('gridUnit')} 0 0;
    width: ${th('gridUnit')};
  }

  .${classNames.selectedTag}:hover, .${classNames.selectedTag}:focus {
    text-decoration: line-through;

    ${props =>
      realBorder('transparent', props.theme.colorBackground)} &::after {
      color: ${th('colorError')};
    }
  }
  .${classNames.search} {
    display: inline-block;

    /* match tag layout */
    margin: 0 0 calc(${th('gridUnit')} * 3) 0;

    /* prevent autoresize overflowing the container */
    max-width: calc(${th('gridUnit')} * 15);
    padding: ${th('gridUnit')} ${th('gridUnit')};
  }

  @media screen and (min-width: 30em) {
    .${classNames.search} {
      /* this will become the offsetParent for suggestions */
      position: relative;
    }
  }

  .${classNames.search} input {
    border: 0;
    border-bottom: ${th('borderWidth')} dashed ${th('colorBorder')};
    color: ${th('colorText')};
    font-family: ${th('fontReading')};

    /* match the font styles */
    font-size: inherit;
    line-height: inherit;

    /* remove styles and layout from this element */
    margin: 0;

    /* prevent autoresize overflowing the container */
    max-width: 100%;
    min-width: calc(${th('gridUnit')} * 15);
    outline: none;
    padding: 0;

    &::placeholder {
      font-family: ${th('fontInterface')};
      color: ${th('colorTextPlaceholder')};
    }

    &::-ms-clear {
      display: none;
    }

    &:focus,
    &:hover {
      border-bottom: ${th('borderWidth')} dashed ${th('colorPrimary')};
    }
  }
`

/**
 * @component
 */
export default Tags
