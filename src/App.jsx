import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SkipTypes from './pages/SkipTypes'
import Tracking from './pages/Tracking'

function App() {
  return (
    <div className="antialiased">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skip-types" element={<SkipTypes />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
