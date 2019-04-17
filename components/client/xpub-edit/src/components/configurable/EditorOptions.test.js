import React from 'react'
import { shallow } from 'enzyme'
import EditorOptions from './EditorOptions'

function makeWrapper(props) {
  return shallow(<EditorOptions {...props} />)
}

describe('EditorOptions', () => {
  it('passes menu to child editor', () => {
    const children = jest.fn()
    makeWrapper({ bold: true, italic: true, underline: false, children })

    expect(children).toHaveBeenCalled()
    expect(children.mock.calls[0][0].menu).toMatchObject([
      { title: 'Toggle bold' },
      { title: 'Toggle italic' },
    ])
  })

  it('ignores change of props', () => {
    const children = jest.fn()
    const wrapper = makeWrapper({ bold: true, children })
    wrapper.setProps({ bold: false })
    expect(children.mock.calls[0][0]).toBe(children.mock.calls[1][0])
  })

  it('passes down arbitrary props', () => {
    const children = jest.fn()
    makeWrapper({ bold: true, foo: 'bar', children })
    expect(children.mock.calls[0][1]).toEqual({ foo: 'bar' })
  })
})
