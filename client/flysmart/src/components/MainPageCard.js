import React from 'react';
import { useNavigate } from 'react-router-dom';

import IndigoIcon from './images/IndiGo.svg';
import SkyHighAirwaysIcon from './images/sky.png';
import QatarIcon from './images/Qatar.svg';
import EmiratesIcon from './images/Emirates.svg';

const MainPage = ({ flight }) => {
  const navigate = useNavigate();

  if (!flight) {
    return null; // Render nothing if no flight data is provided
  }

  // Mapping airline names to their respective icons
  const airlineIcons = {
    'Indigo': <img src={IndigoIcon} alt="Indigo" className="w-6 h-6" />,
    'SkyHigh Airways': <img src={SkyHighAirwaysIcon} alt="SkyHigh Airways" className="w-6 h-6" />,
    'Qatar': <img src={QatarIcon} alt="Qatar" className="w-6 h-6" />,
    'Emirates': <img src={EmiratesIcon} alt="Emirates" className="w-6 h-6" />,
  };

  // Determine the icon based on the airline_name
  const airlineIcon = flight.airline_name ? airlineIcons[flight.airline_name] : null;
  console.log("The flight results is ",flight);
  if (flight['airlinename'] == undefined){
    flight['airlinename'] = flight.airline_name;
  }
  if (flight['destination_airport_name'] == undefined){
    flight['destination_airport_name'] = flight.dest_airport_name;
  }
  
  // flight['destination_airport_name'] = flight.dest_airport_name;

  // Handle navigation on button click
  const handleBookFlight = () => {
    navigate('/userDetails', { state: { flight } });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center text-sm transition-transform transform hover:cursor-pointer">
      <div className="flex items-center">
        {airlineIcon && (
          <div className="mr-4">
            {airlineIcon}
          </div>
        )}
        <div>
          <div className="font-semibold">Flight Number: {flight.flight_number}</div>
          <div className="text-gray-600">Departure Time: {new Date(flight.departure_time).toLocaleString()}</div>
          <div className="text-gray-600">From: {flight.source_airport_name}</div>
          <div className="text-gray-600">To: {flight.destination_airport_name}</div>
          <div className="text-gray-600">Airline: {flight.airlinename}</div>
          <div className="text-gray-600">Journey Start: {flight.journey_start_date}</div>
          <div className="text-gray-600">Journey End: {flight.journey_end_date}</div>
        </div>
      </div>
      <div className="text-right">
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2" onClick={handleBookFlight}>
          Book Flight
        </button>
      </div>
    </div>
  );
};

export default MainPage;
