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
    font-size: 1em;
    line-height: 1.2;
    padding: 6px 0 0 6px;
    position: relative;
  }

  .${classNames.root}.${classNames.rootFocused} {
    border-color: var(--color-primary);
  }

  .${classNames.selected} {
    display: inline;
  }

  .${classNames.selectedTag} {
    border: 0 solid transparent;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-family: 'Vollkorn', serif;

    /* match the font styles */
    font-size: inherit;
    line-height: inherit;
    margin: 0 1em 1em 0;
    padding: 0.1em 0.3em;

    ${realBorder('#aaa', 'white')}
  }

  .${classNames.selectedTag}::after {
    background: white;
    color: #aaa;
    content: '\\2715';
    // margin: 0;
    display: inline-block;
    font-size: 0.9em;
    font-weight: 600;
    height: 10px;
    margin-left: 8px;
    padding: 3px 0 0;
    text-shadow: none;
    width: 13px;

    &:hover {
      background: var(--color-primary);
    }
  }

  .${classNames.selectedTag}:hover,
  .${classNames.selectedTag}:focus {
    text-decoration: line-through;

    ${realBorder('transparent', 'white')}

    &::after {
      color: var(--color-danger);
    }
  }
  .${classNames.search} {
    display: inline-block;

    /* match tag layout */
    margin: 0 1em 1em 0;

    /* prevent autoresize overflowing the container */
    max-width: 100px;
    padding: 0.1em 0.3em;
  }

  @media screen and (min-width: 30em) {
    .${classNames.search} {
      /* this will become the offsetParent for suggestions */
      position: relative;
    }
  }

  .${classNames.search} input {
    border: 0;
    border-bottom: 1px dashed grey;
    color: black;
    font-family: 'Vollkorn', serif;

    /* match the font styles */
    font-size: inherit;
    line-height: inherit;

    /* remove styles and layout from this element */
    margin: 0;

    /* prevent autoresize overflowing the container */
    max-width: 100%;
    min-width: 15ch;
    outline: none;
    padding: 0;

    &::placeholder {
      font-family: 'Fira Sans Condensed', sans-serif;
      opacity: 0.5;
    }

    &:focus,
    &:hover {
      border-bottom: 1px dashed var(--color-primary);
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
