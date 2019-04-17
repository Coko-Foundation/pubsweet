import React from 'react'

export default {
  bold: <b>Bold</b>,
  italic: <i>Ital</i>,
  underline: <u>Under</u>,
  link: <span>Link</span>,
  smallcaps: (
    <span>
      T<span style={{ fontSize: '70%', fontVariant: 'small-caps' }}>T</span>
    </span>
  ),
  subscript: (
    <span>
      t<sub>x</sub>
    </span>
  ),
  superscript: (
    <span>
      t<sup>x</sup>
    </span>
  ),
  heading: <span>Heading</span>,
  undo: <span>Undo</span>,
  redo: <span>Redo</span>,
}
