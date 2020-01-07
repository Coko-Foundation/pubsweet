import { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const fadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`

export { fadeIn, fadeOut }
