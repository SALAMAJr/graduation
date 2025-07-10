import React from 'react'
import { Link} from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav>
        <div className="logo"> 
        <img src="img/logo.png" alt='FurniSwap Logo'/>
        </div>
        <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/howItWorks">How It Works</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="auth-buttons">
            <button className="btn-primary">Get Started</button>
        </div>
    </nav>
    </div>
  )
}

export default Navbar