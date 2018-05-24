import React from 'react'
import { mount, shallow } from 'enzyme'

import DateParser from '../src/atoms/DateParser'

describe('DateParser', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <DateParser timestamp="2018-05-18T10:38:12.063Z">
        {t => <span>{t}</span>}
      </DateParser>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('parses the date correctly', () => {
    let stamp
    mount(
      <DateParser timestamp="2018-05-18T10:38:12.063Z">
        {t => {
          stamp = t
          return <span>{t}</span>
        }}
      </DateParser>,
    )
    expect(stamp).toEqual('18.05.2018')
  })

  it('formats date correctly', () => {
    let stamp
    mount(
      <DateParser dateFormat="YYYY-DD-MM" timestamp="2018-05-18T10:38:12.063Z">
        {t => {
          stamp = t
          return <span>{t}</span>
        }}
      </DateParser>,
    )
    expect(stamp).toEqual('2018-18-05')
  })

  it('renders the right children', () => {
    const wrapper = mount(
      <DateParser dateFormat="YYYY-MM-DD" timestamp="2018-05-18T10:38:12.063Z">
        {t => <div>{t}</div>}
      </DateParser>,
    )
    expect(wrapper.find('div')).toHaveLength(1)
    expect(wrapper.html()).toMatch('2018-05-18')
  })
})
