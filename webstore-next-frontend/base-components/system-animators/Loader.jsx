import React from 'react'

export default function Loader({width, height}) {

  return (
    <div class="loader" style={{width: width, height: height}}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}
