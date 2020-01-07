/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { escapeRegExp } from 'lodash'
import { peoplePropType } from './types'

function stringifyObjectValues(val) {
  if (val === undefined || val === null) {
    return ''
  }

  if (val instanceof Object && !(val instanceof Date)) {
    // Arrays are also object, and keys just returns the array indexes
    // Date objects we convert to strings
    return Object.keys(val)
      .sort()
      .filter(v => v !== undefined && v !== null)
      .map(k => stringifyObjectValues(val[k]))
      .join(' ')
  }

  return String(val)
}

function localFilterFn(people, searchValue) {
  return people.filter(
    person =>
      stringifyObjectValues(person).match(new RegExp(searchValue, 'gi')) !==
      null,
  )
}

class PeoplePickerLogic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: this.props.initialSelection,
      searchValue: '',
    }
  }

  toggleSelection(person) {
    if (this.select(person)) {
      this.setState({
        selection: this.state.selection.filter(p => p.id !== person.id),
      })
    } else if (this.state.selection.length < this.props.maxSelection) {
      this.setState({ selection: this.state.selection.concat(person) })
    }
  }

  handleSubmit() {
    if (this.isValid()) {
      this.props.onSubmit(this.state.selection)
    }
  }

  select(person) {
    return this.state.selection.some(p => p.id === person.id)
  }

  isValid() {
    const selectionLength = this.state.selection.length
    return (
      selectionLength >= this.props.minSelection &&
      selectionLength <= this.props.maxSelection
    )
  }

  searchSubmit = searchValue => {
    this.setState({ searchValue })
  }

  getMatchIndex = (inputValue, option) => {
    const re = new RegExp(escapeRegExp(inputValue))
    const match = re.exec(option.toLowerCase())
    if (match) return match.index
    return -1
  }

  render() {
    const { people, customFilterFn, ...otherProps } = this.props
    const filterFn = customFilterFn || localFilterFn
    const filteredPeople =
      typeof people === 'function'
        ? people(this.state.searchValue)
        : filterFn(people, this.state.searchValue)

    const searchOptions = filteredPeople.map(person => ({
      value: person.name,
    }))

    return this.props.children({
      ...otherProps,
      people: filteredPeople,
      searchSubmit: this.searchSubmit,
      searchOptions,
      filterFunction: this.props.filterFunction,
      getMatchIndex: this.getMatchIndex,
      isSelected: person => this.select(person),
      isValid: this.isValid(),
      selection: this.state.selection,
      onSubmit: () => this.handleSubmit(),
      toggleSelection: person => this.toggleSelection(person),
    })
  }
}

PeoplePickerLogic.propTypes = {
  initialSelection: peoplePropType,
  minSelection: PropTypes.number,
  maxSelection: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
}

PeoplePickerLogic.defaultProps = {
  initialSelection: [],
  minSelection: 0,
  maxSelection: Infinity,
}

export default PeoplePickerLogic
