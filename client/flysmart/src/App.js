import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { useRoutes } from 'react-router-dom';
import ReservationForm from './components/ReservationForm'

// importing the global CSS file
import './index.css'

// importing the components
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import FlightSearch from './components/FlightSearch'
import FlightResults from './components/FlightResults'
import UserDetails from './components/UserDetails'


export default function App() {

  const routes= useRoutes([
    {path:'/',element:<HomePage/>},
    {path: '/userDetails' , element: <UserDetails />},
    {path:'/flightResults',element:<FlightResults/>},
    {path:'/booking',element:<ReservationForm/>}
  ]);

  return routes;
}


