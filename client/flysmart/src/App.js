import React from 'react'

// importing the global CSS file
import './index.css'

// importing the components
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import FlightSearch from './components/FlightSearch'

// importing react Hooks
import {useState,useEffect} from 'react';

// importing react-router-dom
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default function App() {
  return (
    <>
    <Navbar/>
    <Carousel />
    <FlightSearch />
    </>
    
  )
}


