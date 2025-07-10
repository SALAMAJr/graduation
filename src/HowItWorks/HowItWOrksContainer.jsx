import React from 'react'

function HowItWOrksContainer() {
    return (
    <div>
            <br/><br/><br/><br/><br/><br/><br/> <br/> <br/> <br/>
    <main className="how-it-works-container">
        <section className="intro-section">
            <h1>How It Works</h1>
            <p className="subtitle">We've made furniture shopping simple and convenient. Follow these three <br/> easy steps to transform your space with our beautiful furniture.</p>
        </section> 

    <section className="steps-section">
            <div className="step-how">
                <img src="img/how-it-works/div (2).png" alt=""/>
                <h2>1.Choose Your Furniture</h2>
                <p>Br/owse our carefully curated collection of premium furniture pieces. Filter by style, color, and price to fit your perfect match.</p>
            </div>
            
            <div className="step-how">
                <img src="img/how-it-works/div (3).png" alt=""/>
                <h2>2.Place Your Order</h2>
                <p>Secure checkout with multiple payment options. Add your delivery  details and any special instructions for installation.</p>
            </div>
            
            <div className="step-how">
                <img src="img/how-it-works/div (4).png" alt=""/>
                <h2>3.Get It Delivered</h2>
                <p>Sit back and relax! Our professional delivery team will br/ing your furniture right to your doorstep and handle the setup.</p>
            </div>
        </section> 
        <div className="divider"></div>

        <section className="cta-section">
            <img src="img/how-it-works/img.png" alt=""/>
            <h2>Ready to Transform Your Space?</h2>
            <p>Experience the ease of furniture shopping with FurniCraft. Our expert team is here <br/> to help you every step of the way.</p>
            <button className="cta-button">Start Shopping Now</button>
        </section>
        <section className="benefits-section">
            <div className="benefits-grid">
                <div className="benefit-card">
                    <img src="img/how-it-works/Frame.png" alt=""/>
                    <h3>Free Delivery</h3>
                    <p>On orders over $999</p>
                </div> 
                <div className="benefit-card">
                    <img src="img/how-it-works/Frame (2).png" alt=""/>
                    <h3>2 Year Warranty</h3>
                    <p>On all products</p>
                </div>
                <div className="benefit-card">
                    <img src="img/how-it-works/Frame (3).png" alt=""/>
                    <h3>30-Day Returns</h3>
                    <p>Easy returns policy</p>
                </div> 
                <div className="benefit-card">
                    <img src="img/how-it-works/Frame (4).png" alt=""/>
                    <h3>24/7 Support</h3>
                    <p>Always here to help</p>
                </div>
            </div>
        </section>
    </main> 
    </div>
    )
}

export default HowItWOrksContainer