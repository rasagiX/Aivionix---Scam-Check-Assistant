import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Section1 from './component/section1/section1.jsx'
import Section2 from './component/section2/section2.jsx'
import Section3 from './component/section3/section3.jsx'
import Section4 from './component/section4/section4.jsx'
import Section5 from './component/section5/section5.jsx'
import Section6 from './component/section6/section6.jsx'
import Section7 from './component/section7/section7.jsx'
import Section8 from './component/section8/section8.jsx'

import About from './component/pages/aboutus.jsx'
import Login from './component/pages/login.jsx'
import Signup from './component/pages/signup.jsx'
import Terms from './component/pages/terms.jsx'
import UserGuide from './component/pages/userguide.jsx'

// Home landing with sections
const Home = () => {
  return (
    <div>
      <Section1/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Section6/>
      <Section7/>
      <Section8/>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/userguide" element={<UserGuide />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App
