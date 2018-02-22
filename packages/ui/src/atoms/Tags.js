import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import styled from 'styled-components'

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
    padding: ${props => props.theme.subGridUnit} 0 0 ${props =>
  props.theme.subGridUnit};
    position: relative;
  }

  .${classNames.root}.${classNames.rootFocused} {
    border-color: ${props => props.theme.colorPrimary};
  }

  .${classNames.selected} {
    display: inline;
  }

  .${classNames.selectedTag} {
    border: 0;
    cursor: pointer;
    display: inline-block;
    font-family: ${props => props.theme.fontReading};

    /* match the font styles */
    margin: 0 ${props => props.theme.subGridUnit} ${props =>
  props.theme.gridUnit} 0;
    padding: 0.1em 0.3em;

    ${props => realBorder(props.theme.colorBorder, props.theme.colorBackground)}
  }

  .${classNames.selectedTag}::after {
    color: ${props => props.theme.colorBorder};
    content: '\\2715';
    display: inline-block;
    font-size: ${props => props.theme.fontSizeBaseSmall};
    font-weight: 600;
    margin-left: ${props => props.theme.subGridUnit};
    padding: ${props => props.theme.subGridUnit} 0 0
    width: ${props => props.theme.subGridUnit};
  }

  .${classNames.selectedTag}:hover,
  .${classNames.selectedTag}:focus {
    text-decoration: line-through;

    ${props => realBorder('transparent', props.theme.colorBackground)}

    &::after {
      color: ${props => props.theme.colorError};
    }
  }
  .${classNames.search} {
    display: inline-block;

    /* match tag layout */
    margin: 0 0 ${props => props.theme.gridUnit} 0;

    /* prevent autoresize overflowing the container */
    max-width: calc(${props => props.theme.gridUnit} * 5);
    padding: ${props => props.theme.subGridUnit} ${props =>
  props.theme.subGridUnit};
  }

  @media screen and (min-width: 30em) {
    .${classNames.search} {
      /* this will become the offsetParent for suggestions */
      position: relative;
    }
  }

  .${classNames.search} input {
    border: 0;
    border-bottom: ${props => props.theme.borderWidth} dashed ${props =>
  props.theme.colorBorder};
    color: ${props => props.theme.colorText};
    font-family: ${props => props.theme.fontReading};

    /* match the font styles */
    font-size: inherit;
    line-height: inherit;

    /* remove styles and layout from this element */
    margin: 0;

    /* prevent autoresize overflowing the container */
    max-width: 100%;
    min-width: calc(${props => props.theme.gridUnit} * 5);
    outline: none;
    padding: 0;

    &::placeholder {
      font-family: ${props => props.theme.fontInterface};
      color: ${props => props.theme.colorTextPlaceholder};
    }

    &:focus,
    &:hover {
      border-bottom: ${props => props.theme.borderWidth} dashed ${props =>
  props.theme.colorPrimary};
    }
  }

  .${classNames.search} input::-ms-clear {
    display: none;
  }
`

/**
 * @component
 */
export default Tags
