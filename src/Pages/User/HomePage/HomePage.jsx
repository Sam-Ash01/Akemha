import React from 'react'
import HeroSection from '../../../Components/User/RemainingComponents/HeroSection/HeroSection.jsx'
import Services from '../../../Components/User/RemainingComponents/Services/Services.jsx'
import Achievements from '../../../Components/User/RemainingComponents/Achievements/Achievements.jsx'
import Goals from '../../../Components/User/RemainingComponents/Goals/Goals.jsx'
import Testimonials from '../../../Components/User/RemainingComponents/Testimonials/Testimonials.jsx'
import Contact from '../../../Components/User/RemainingComponents/Contact/Contact.jsx'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Services />
      <Achievements />
      <Goals />
      <Testimonials />
      <Contact/>
    </>
  )
}

export default HomePage
