import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { useRoutes } from 'react-router-dom';

// importing the global CSS file
import './index.css'

// importing the components
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import FlightSearch from './components/FlightSearch'
import Thankyou from './components/Thankyou'


export default function App() {

  const routes= useRoutes([
    {path:'/',element:<HomePage/>},
    {path:'/thankyou',element:<Thankyou/>}
  ]);

  return routes;
}


