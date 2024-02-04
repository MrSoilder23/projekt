import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
        <div><button className='User'></button></div>
        <div className='navContainer'>
            <ol>
                <li><Link to='/' className='homeBtn'></Link></li>
                <li><Link to='/graphview'></Link></li>
                <li><Link to='/'></Link></li>
                <li><Link to='/'></Link></li>
                <li><Link to='/'></Link></li>
            </ol>
        </div>
    </nav>
  )
}

export default Navbar