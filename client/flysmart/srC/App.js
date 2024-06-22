import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import FlightSearch from './components/FlightSearch'

export default function App() {
  return (
    <>
    {/* rendering navbar */}
    <Navbar/>
    <Carousel />
    <FlightSearch />
    </>
    
  )
}
