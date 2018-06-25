import React from 'react'
import makeConfig from '.'

describe('makeConfig', () => {
  it('turns an object of features into a config', () => {
    const config = makeConfig({})

    expect(config.schema).toBeTruthy()
    expect(config.menu).toBeTruthy()
    expect(config.plugins).toBeTruthy()
  })

  it('adds marks', () => {
    const features = {
      bold: true,
      italic: true,
      underline: true,
      link: true,
      smallcaps: false,
      'not real': true,
      superscript: true,
      subscript: true,
    }
    const config = makeConfig(features)
    const realFeatures = [
      'bold',
      'italic',
      'underline',
      'link',
      'superscript',
      'subscript',
    ]

    expect(Object.keys(config.schema.marks)).toEqual(realFeatures)
  })

  it('adds nodes', () => {
    const config = makeConfig({ bold: true, heading: true })

    expect(Object.keys(config.schema.nodes)).toContain('heading')
  })

  it('allows custom menu icons', () => {
    const features = {
      bold: { icon: <b>Boldly go</b> },
      italic: true,
    }
    const config = makeConfig(features)

    expect(config.menu).toMatchObject([{ content: <b>Boldly go</b> }, {}])
  })
})
