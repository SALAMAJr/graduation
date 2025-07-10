import React from 'react'

function Expertise() {
  return (
    <div>
        <section className="expertise">
        <h2>Our Expertise & Vision</h2>
        <p>At Furni Swap, we bring together decades of combined experience in furniture design, e-commerce, and sustainable living. Our team's diverse background spans technology, interior design, customer service, <br/> allowing us to create a revolutionary platform for furniture exchange. </p>
        <br/>
        <div className="values">
            <div className="value">
                <img src="img/i1.png" alt=''/>
                <h3>Innovation</h3>
                <p>Foreseeing new ways to make furniture exchange seamless <br/> and sustainable</p>
            </div>
            <div className="value">
                <img src="img/i2.png" alt=''/>
                <h3>Community</h3>
                <p>Building a trusted network of furniture enthusiasts worldwide</p>
            </div>
            <div className="value">
                <img src="img/i3.png" alt=''/>
                <h3>Sustainability</h3>
                <p>Committed to reducing <br/> furniture waste through smart <br/> exchanges</p>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Expertise