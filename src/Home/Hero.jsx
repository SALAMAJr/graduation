import React from 'react'

function Hero() {
  return (
    <div>
        <header className="hero">
        <div className="text-content">
        <h1>Swap, Sell & Style Your Home the Smart Way!</h1>
        <p>Join the circular economy and find the perfect furniture for your space while giving your old pieces a new home.</p>     
        <div className="cta-buttons">
            <button className="btn-primary">Start Swapping</button>
            <button className="btn-secondary">Learn How</button>     
        </div>
        </div>      
        <div className="image-section">      
        <img src="img/Rec1.png" alt=''/> 
        </div>
        
    </header>
    </div>
  )
}

export default Hero