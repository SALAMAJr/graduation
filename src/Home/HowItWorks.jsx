import React from 'react'

function HowItWorks() {
    return (
    <div>
            <section className="how-it-works">
        <h2>How Furni Swap Works</h2>
        <hr/>
        <div className="steps">    
            <div className="step">
                <img src="img/card-icon1.png" alt=''/>
                <h3>List Your Items</h3>
                <p>Take photos of your furniture, add details, and post your listings. The more information you provide, the better matches you'll get.</p>
            </div>
            <div className="step">
            <img src="img/card-icon2.png" alt=''/>
                <h3>Match & Swap</h3>
                <p>Browse available items, find matches you're interested in, and connect with other members to arrange your furniture swap.</p>
            </div>
            <div className="step">
                <img src="img/card-icon3.png" alt=''/>
                <h3>Refresh Your Space</h3>
                <p>Complete the swap and enjoy your newly refreshed space with furniture that better fits your needs and style.</p>
            </div>
        </div>
    </section>
    </div>
    )
}

export default HowItWorks