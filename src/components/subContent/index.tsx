/** @format */

import React from 'react'
import { PostBySubMenuIdWithItems } from 'src/types'

type Props = {
  subMenuContent: PostBySubMenuIdWithItems
}

export default function SubContentComponent({ subMenuContent }: Props) {
  return (
    <React.Fragment>
      <div>SubContentComponent</div>
    </React.Fragment>
  )
}
