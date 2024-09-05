/** @format */

import React from 'react'

export default React.memo(function TitleUtterances() {
  return (
    <section
      ref={elem => {
        if (!elem) {
          return
        }
        elem.style.height = '100%'

        const scriptElem = document.createElement('script')
        scriptElem.src = 'https://utteranc.es/client.js'
        scriptElem.async = true
        scriptElem.setAttribute(
          'repo',
          `${process.env.NEXT_PUBLIC_UTTERANCES_REPO1}`
        )
        scriptElem.setAttribute(
          'issue-term',
          `${process.env.NEXT_PUBLIC_UTTERANCES_ISSUE_TERM1}`
        )
        scriptElem.setAttribute('theme', 'github-dark-orange')
        scriptElem.setAttribute('label', 'blog-comment')
        scriptElem.crossOrigin = 'anonymous'
        elem.appendChild(scriptElem)
      }}
    />
  )
})
