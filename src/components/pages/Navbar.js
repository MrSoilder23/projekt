import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({dataToSend}) {
  return (
    <nav className='navbar'>
        <div><button className='User'></button></div>
        <div className='navContainer'>
            <ol>
                <li><Link to='/' className='homeBtn'><div className='buttonIcon' onClick={() => dataToSend("Notes")}></div></Link></li>
                <li><Link to='/'><div className='buttonIcon' onClick={() => dataToSend("GraphView")}></div></Link></li>
                <li><Link to='/'><div className='buttonIcon'></div></Link></li>
                <li><Link to='/'><div className='buttonIcon'></div></Link></li>
                <li><Link to='/'><div className='buttonIcon'></div></Link></li>
            </ol>
        </div>
    </nav>
  )
}

export default Navbar