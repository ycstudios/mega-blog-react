import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className="font-bold text-2xl" style={{width}}>
      <span className="text-red-600">Mega</span>
      <span className="text-gray-800">Blog</span>
    </div>
  )
}

export default Logo