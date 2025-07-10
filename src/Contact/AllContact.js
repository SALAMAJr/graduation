import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import ContactHeader from './ContactHeader'
import ContactSection from './ContactSection'
import FAQ from './FAQ'
function AllContact() {
  return (
    <div>
        <Navbar/>
        <ContactHeader/>
        <ContactSection/>
        <FAQ/>
        <Footer/>
    </div>
  )
}

export default AllContact