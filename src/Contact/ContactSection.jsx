import React from 'react'

function ContactSection() {
  return (
    <div>
    <section className="contact-section">
    <div className="contact-form">
        <h2>Send us a Message</h2>
        <form>
        <label>Name</label>
        <input type="text" placeholder="Your full name" />
        <label>Email</label>
        <input type="email" placeholder="your@email.com" />
        <label>Subject</label>
        <input type="text" placeholder="How can we help?" />
        <label>Message</label>
        <textarea rows="5" placeholder="Your message..."></textarea>
        <button className="btn-primary">Send Message</button>
      </form>
    </div>

    <div className="contact-info">
      <div className="info-grid">
        <div className="info-card">
        <i className="fa-solid fa-phone"></i>
        <h3>Phone</h3>
        <p>+1 (555) 123-4567</p>
      </div>
      <div className="info-card">
        <i className="fa-solid fa-envelope"></i>
        <h3>Email</h3>
        <p>info@furnicraft.com</p>
      </div>
      <div className="info-card">
        <i className="fa-solid fa-location-dot"></i>
        <h3>Address</h3>
        <p>123 Furniture Street<br/>New York, NY 10001</p>
      </div>
      <div className="info-card">
        <i className="fa-solid fa-clock"></i>
        <h3>Hours</h3>
        <p>Mon-Sat: 10AM - 8PM<br/>Sun: 11AM - 6PM</p>
      </div>
      </div>
      <div className="office-img">
        <img src="img/contact/div (2).png" alt="office" />
      </div>
    </div>
  </section>
    </div>
  )
}

export default ContactSection