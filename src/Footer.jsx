import React from 'react'
import { Link } from 'react-router'

function Footer() {
  return (
    <div>
    <footer>
    <div className="footer-content">
    <div className="footer-section">
        <h3 className="no-underline">FurniSwap</h3>
        <p>The smart way to refresh your space<br/>without buying new furniture.</p>
        <div className="social-icons">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-pinterest-p"></i>
        </div>
    </div>
    <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
        <li><Link to="about.html">About Us</Link></li>
        <li><Link to="how-it-works.html">How It Works</Link></li>
        <li><Link to="contact.html">FAQs</Link></li>
        <li><Link to="contact.html">Contact</Link></li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Support</h3>
      <ul>
        <li><Link to="#">Help Center</Link></li>
        <li><Link to="#">Safety Guidelines</Link></li>
        <li><Link to="#">Privacy Policy</Link></li>
        <li><Link to="#">Terms of Service</Link></li>
      </ul>
    </div>
    <div className="footer-section">
        <h3>Newsletter</h3>
        <p>Subscribe for tips, new furniture<br/>listings, and swap inspiration.</p>
        <div className="newsletter">
        <input type="email" placeholder="Your email address" />
        <button><i className="fas fa-paper-plane"></i></button>
        </div>
    </div>
</div>
<div className="footer-bottom">
    <p>© 2023 Furni Swap. All rights reserved.</p>
</div>
</footer>
    </div>
)
}

export default Footer