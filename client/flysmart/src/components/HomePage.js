import React from 'react'

// importing the global CSS file
import '../index.css'

// importing the components
import Navbar from './Navbar'
import Carousel from './Carousel'
import FlightSearch from './FlightSearch'


export default function HomePage() {
  return (
    <>
    <Navbar/>
    <Carousel />
    <FlightSearch />

    </>
  )
}
