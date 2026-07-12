import React from 'react'

export default function Spinner({width}) {

  return (
    <div class="spinner">
        <svg width={width} viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
        </svg>
    </div>
  )
}