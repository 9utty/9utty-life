/** @format */

import React from 'react'
import { PostByItemId } from 'src/types'

type Props = {
  item: PostByItemId
}

export default function ItemComponent({ item }: Props) {
  return (
    <React.Fragment>
      <div>ItemComponent</div>
    </React.Fragment>
  )
}
