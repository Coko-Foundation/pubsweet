import * as React from 'react'

const FakeExtension = ({ colour, children }) => (
  <div
    style={{
      backgroundColor: colour,
      color: 'white',
      padding: 10,
    }}
  >
    {children}
  </div>
)

const InlineExtension = () => (
  <FakeExtension colour="green">Inline extension demo</FakeExtension>
)

const BlockExtension = () => (
  <FakeExtension colour="black">Block extension demo</FakeExtension>
)

const BodiedExtension = () => (
  <FakeExtension colour="blue">Bodied extension demo</FakeExtension>
)

export const extensionHandler = {
  'com.atlassian.confluence.macro.core': (ext, doc) => {
    const { extensionKey } = ext

    // using any here because most props are going to be injected through the extension handler
    // and typescript won't accept that as valid
    const macroProps = {
      node: ext,
    }

    switch (extensionKey) {
      case 'block-eh':
        return <BlockExtension {...macroProps} />
      case 'bodied-eh':
        return <BodiedExtension {...macroProps} />
      case 'inline-eh':
        return <InlineExtension {...macroProps} />
      default:
        return null
    }
  },
}
