import React from 'react'
import '../styles/Document.css'

function Document() {
  return (
    <div className='document'>
        <div className='info'>
            <h1>Dokument</h1>
            <div className='underLine'></div>

            <div className='data'>
                <div className='date'><h4>20.01.2024</h4></div>
                <div className='hour'><h4>20:01</h4></div>
            </div>

            <div className='tagContainer'>
                <div className='tags'>
                    <h4>#tag1,</h4>
                    <h4>#tag2,</h4>
                    <h4>#tag3</h4>
                </div>
            </div>
        </div>
        <div className='text' contentEditable="true">
            <h2>Borys to gicior</h2>
            <h3>Lorem Ipsum is simply dummy text of the printing and typesetting</h3>
        </div>
        
    </div>
  )
}

export default Document