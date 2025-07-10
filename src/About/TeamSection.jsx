import React from 'react'

function TeamSection() {
  return (
    <div> 
        <section className="team-section">
        <h1>Meet the Team Behind Furni <br/>Swap</h1>
        <p className="subtitle">We're a passionate group of furniture enthusiasts and tech innovators, committed to <br/> revolutionizing how people discover and exchange quality furniture.</p>
        
        <div className="stats">
            <span className="rating"><img src="img/Frame (2)ab.png" alt=""/> 4.9/5 Rating</span>
            <span className="customers"> <img src="img/Frame-ab.png" alt=""/> 50K+ Happy Customers</span>
        </div>
        
        <div className="team-grid">
            <div className="team-member">
                <img src="img/about/merna.jpg" alt="" className="profile-picture"/>
                <h3>Merna Mohy</h3>
                <p>Frontend Developer</p>
            </div>
            <div className="team-member">
                <img src="img/about/safia.jpg" className="profile-picture" alt=''/>
                <h3>Safia Nashaat</h3>
                <p>Flutter Developer</p>
            </div>
                 <div className="team-member">
                <img src="img/about/salama.jpg" className="profile-picture" alt=''/>
                <h3>Mohammed Salama</h3>
                <p>Flutter Developer</p>
            </div>
            <div className="team-member">
                <img src="img/about/gasser.jpg" className="profile-picture" alt=''/>
                <h3>Gasser Wael</h3>
                <p>UI/UX</p>
            </div>
            <div className="team-member">
                <img src="img/about/mahmoud etman.jpg" className="profile-picture" alt=''/>
                <h3>Mahmoud Etman</h3>
                <p>AI Developer</p>
            </div>
                <div className="team-member">
                <img src="img/about/m-ibrahim.jpg" className="profile-picture" alt=''/>
                <h3>Mohammed Ibrahim</h3>
                <p>Backend Developer</p>
            </div>
            <div className="team-member">
                <img src="img/about/Hussein Dawood.jpg" className="profile-picture" alt=''/>
                <h3>Hussein Dawood</h3>
                <p>Backend Developer</p>
            </div>
            <div className="team-member">
                <img src="img/about/mazlom.jpg" className="profile-picture" alt=''/>
                <h3>Mohammed Mazloum</h3>
                <p>Backend Developer</p>
            </div>
            <div className="team-member">
                <img src="img/about/WhatsApp Image 2025-07-06 at 13.59.25_b165eb39.jpg" className="profile-picture" alt=''/>
                <h3>Mohammed Nasr</h3>
                <p>Backend Developer</p>
            </div>
            <div className="team-member">
                <img src="img/about/WhatsApp Image 2025-07-06 at 13.59.25_b165eb39.jpg" className="profile-picture" alt=''/>
                <h3>Amjad Ebaid</h3>
                <p>Backend Developer</p>
            </div>
        </div>
    </section>
    </div>
  )
}

export default TeamSection