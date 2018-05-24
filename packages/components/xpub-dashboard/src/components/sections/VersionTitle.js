import React from 'react'
import styled from 'styled-components'
import { th } from '@pubsweet/ui-toolkit'
// import {TitleViewer} from 'xpub-edit/src/components'

const Root = styled.div`
  font-size: ${th('fontSizeHeading4')};
`

export default ({ version, className }) => {
  // <TitleViewer
  //     value={version && version.metadata && version.metadata.title || 'Untitled'}
  //     className={className}/>

  const title =
    version && version.metadata && version.metadata.title
      ? version.metadata.title
      : 'Untitled'

  return <Root>{title}</Root>
}
