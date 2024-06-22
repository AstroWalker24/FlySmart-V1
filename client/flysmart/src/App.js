import React from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import FlightSearch from './components/FlightSearch'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


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


