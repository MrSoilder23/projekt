import React from 'react'
import './styles/ContextMenu.css'
import Button from './Button'

const ContextMenu = ({
    rightClickItem,
    positionX,
    positionY,
    isToggled,
    buttons,
    contextMenuRef
}) => {
  return (
    <menu 
      className={`contextMenu ${isToggled ? 'active' : ''}`}
      ref={contextMenuRef}

      style={{
        top: positionY + 2 + 'px',
        left: positionX + 2 + 'px'
      }}

    >
        <ol className='btnList'>
          {buttons.map((button,index) => {           
              function handleClick(e) {
                e.stopPropagation()
                button.onClick(e,rightClickItem)
              }

              if(Button.isSpacer) return <hr key={index}></hr>

              return (<li><Button className="list" onClick={handleClick} text={button.text}/></li>)
          })}


        </ol>
    </menu>
  )
}

export default ContextMenu