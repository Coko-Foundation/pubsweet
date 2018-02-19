import React from 'react'
import { mount, shallow } from 'enzyme'

import FilePicker from '../src/atoms/FilePicker'

const props = {
  disabled: false,
  allowedFileExtensions: [],
  onUpload: file => file,
}

describe('FilePicker', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <FilePicker {...props}>
        <div>Upload something</div>
      </FilePicker>,
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('parses the allowed extenstions', () => {
    const wrapper = mount(
      <FilePicker {...props} allowedFileExtensions={['pdf', 'png']}>
        <div>Upload something</div>
      </FilePicker>,
    )

    const parsedExtensions = wrapper.instance().getAllowedTypes()
    expect(parsedExtensions).toEqual(['.pdf', '.png'])
  })

  it('picks file', () => {
    const mockFn = jest.fn()
    const wrapper = mount(
      <FilePicker {...props} onUpload={mockFn}>
        <div>Upload something</div>
      </FilePicker>,
    )
    wrapper.instance().handleUpload({ target: { files: [{ name: 'afile' }] } })
    expect(mockFn.mock.calls).toHaveLength(1)
    expect(wrapper.find('input').props().value).toBeFalsy()
  })

  it('renders correct children', () => {
    const divPicker = shallow(
      <FilePicker {...props}>
        <div>Upload something</div>
      </FilePicker>,
    )

    const spanPicker = shallow(
      <FilePicker {...props}>
        <span>Upload something</span>
      </FilePicker>,
    )

    const CustomComp = ({ label }) => <span>{label}</span>

    const customPicker = shallow(
      <FilePicker {...props}>
        <CustomComp label="pick me" />
      </FilePicker>,
    )

    expect(
      divPicker
        .children()
        .last()
        .type(),
    ).toBe('div')
    expect(
      spanPicker
        .children()
        .last()
        .type(),
    ).toBe('span')
    expect(
      customPicker
        .children()
        .last()
        .type(),
    ).toBe(CustomComp)
  })
})
