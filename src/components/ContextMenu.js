import React from 'react'
import './styles/ContextMenu.css'
import Button from './Button'

function ContextMenu({
    editText,
    addFiles,
}) {
  return (
    <div className='contextMenu'>
        <div className='textTypeList'></div>
        <ol className='btnList'>
          <li><Button className="list" text="Size"/></li>
          <li><Button className="list" text="List"/></li>
          <li><Button className="list" text="Bold"/></li>
          <li><Button className="list" text="Italic"/></li>
          <li><Button className="list" text="Highlight"/></li>
        </ol>
    </div>
  )
}

export default ContextMenu