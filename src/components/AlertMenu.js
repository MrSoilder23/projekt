import React from 'react'
import Button from './Button'
import './styles/AlertMenu.css'

function AlertMenu({
    isActive,
    heading,
    text,
    icon,
    buttonText,
    onClick,
    onClose
}) {
  return (
    <div className={`alertMenu ${isActive ? 'active' : ''}`}>
        <div className='alertContainer'>
          <div className='alertTextContainer'>
            <div className='alertHeading'><h2>{heading}</h2></div>
            <div className='alertText'><h3>{text}</h3></div>
          </div>
        </div>
        <div className='alertButtons'>
            <Button className={"roundedBorder"} text={"Cancel"} onClick={onClose}/>
            <Button className={"rounded"} onClick={onClick} text={buttonText}/>
        </div>
    </div>
  )
}

export default AlertMenu