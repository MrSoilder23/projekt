import React from 'react'
import './styles/DropdownMenu.css'
import Button from './Button'

function DropdownMenu({
    isToggled,
    buttons,
    zCoord
}) {
  return (
    <div className={`dropdown ${isToggled ? 'active' : ''}`} style={{left: zCoord + "px"}}>
        <ol>
            {buttons.map((button,index) => { 
                function handleClick(e) {
                    e.stopPropagation()
                    button.onClick(e)
                  }

                return (<li key={index}><Button className={"li"} onClick={handleClick} text={button.text}/></li>)
            })}
        </ol>
    </div>
  )
}

export default DropdownMenu