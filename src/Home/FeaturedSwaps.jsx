import React from 'react'
import { Link } from 'react-router'

function FeaturedSwaps() {
    return (
    <div>
            <section className="featured-swaps">
                <h2>Featured Furniture Swaps</h2>
                <hr/>
        <div className="swap-cards">
            <div className="swap-card">
                <img src="img/card-image.png" alt=''/>
                <h3>Modern Sofa for Rustic Dining Table</h3>
                <p>Sarah from Seattle swapped her modern sectional sofa for John's handcrafted dining table, craeting perfect spaces for both.</p>
                <Link to="#" className="read-more">Read the story</Link>
            </div>
            <div className="swap-card">
                <img src="img/card-image2.png" alt=''/>
                <h3>Vintage Desk for Bookshelf</h3>
                <p>Mike found the perfect home office desk by swapping his unused bookshelf with Lisa`s vintage writing desk.</p>
                <br/><br/>
                <Link to="#" className="read-more">Read the story</Link>
            </div>
            <div className="swap-card">
                <img src="img/card-image3.png" alt=''/>
                <h3>Bedroom Set for Living Room Pieces</h3>
                <p>The Johnson family completely refreshed two rooms by swapping furniture with the Martinez family`s living room set. </p>
                <br/>
                <Link to="#" className="read-more">Read the story</Link>
            </div>
        </div>
    </section>
    </div>
    )
}

export default FeaturedSwaps