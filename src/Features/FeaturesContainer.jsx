import React from 'react'

function FeaturesContainer() {
  return (
    <div>
        <main class="features-container">
        <h1>Crafting Excellence in Every Detail</h1>
        <p class="intro-text">Discover why our furniture stands apart with unmatched quality,<br/> sustainable practices, and innovative design solutions.</p>
        
        <div class="features-grid">
            <div class="feature-item">
                <img src="img/ii.png" alt="img"/>
                <h2>Master Craftsmanship</h2>
                <p>Each piece is meticulously crafted by skilled artisans with <br/> decades of experience, ensuring exceptional quality and  <br/>attention to detail.</p>
            </div>           
            <div class="feature-item">
                <img src="img/i (1).png" alt=""/>
                <h2>Sustainable Materials</h2>
                <p>We source only the finest eco-friendly materials, supporting <br/> sustainable forestry and reducing environmental impact.</p>
            </div>
            <div class="feature-item">
                <img src="img/i (2).png" alt=""/>
                <h2>Customizable Designs</h2>
                <p>Create furniture that perfectly matches your vision with our <br/> extensive customization options and expert guidance.</p>
            </div>
            
            <div class="feature-item">
                <img src="img/i (3).png" alt=""/>
                <h2>Swift Delivery</h2>
                <p>Experience our efficient delivery service with real-time tracking <br/> and white-glove installation options.</p>
            </div>
        </div>
        
        <section class="materials-section">
            <div class="content-feature">
            <h1>Premium Quality Materials</h1>
            <p>  We carefully select each material for its durability, beauty, and <br/> environmental impact. From sustainably harvested hardwoods to <br/> premium upholstery fabr/ics, every component meets our exacting <br/> standards.</p>
            
            <ul class="materials-list">
                <li><span class="checkmark">&#10003;</span>Premium hardwood selection</li>
                <li><span class="checkmark">&#10003;</span>High-grade upholstery materials</li>
                <li><span class="checkmark">&#10003;</span>Eco-friendly finishing</li>
            </ul>
            </div>
            <div class="img-feature">
            <img src="img/div-features.png" alt=""/>
            </div>
        </section>
        
        <hr class="divider"/>
        
        <section class="process-section">
            <h2>Our Crafting Process</h2>
            <div class="process-steps">
                <div class="process-step">
                    <img src="img/div (2).png" alt=""/>
                    <strong>Design</strong>
                    <p>Collaborative design process with expert guidance</p>
                </div>
                <div class="process-step">
                    <img src="img/div (3).png" alt=""/>
                    <strong>Planning</strong>
                    <p>Detailed material selection and measurement</p>
                </div>
                <div class="process-step">
                    <img src="img/div (4).png" alt=""/>
                    <strong>Creating</strong>
                    <p>Expert craftsmanship and quality control</p>
                </div>
                <div class="process-step">
                    <img src="img/div (5).png" alt=""/>
                    <strong>Delivery</strong>
                    <p>Professional installation and setup</p>
                </div>
            </div>
        </section>
    </main>
    </div>
  )
}

export default FeaturesContainer