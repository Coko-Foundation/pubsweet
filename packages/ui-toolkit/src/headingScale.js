/*
  The scaling function is designed to apply a scale in order to derive the font
  sizes for all headings, given a base font size.

  eg.
  Given a base font size of 12 and a scale of 1.2, your heading font sizes are
  as follows:

  heading 1: 29.85984
  heading 2: 24.8832
  heading 3: 20.736
  heading 4: 17.28
  heading 5: 14.399999999999999
  heading 6: 12

  ** usage **
  scale(12, 1.2, 4)   // evaluates to 17.28
*/

const headingScale = (base, scale, heading) =>
  base * scale ** Math.abs(heading - 6)

export default headingScale
