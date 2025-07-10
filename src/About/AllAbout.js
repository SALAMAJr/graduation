import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import TeamSection from './TeamSection'
import Expertise from './Expertise'
import JoinTeam from './JoinTeam'

function About() {
  return (
    <div>
        <Navbar/>
        <TeamSection/>
        <Expertise/>
        <JoinTeam/>
        <Footer/>
    </div>
  )
}

export default About