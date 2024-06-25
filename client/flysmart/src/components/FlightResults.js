import React, { useState } from 'react';
import MainPage from './MainPageCard';
import { useLocation } from 'react-router-dom';
import {useEffect} from 'react';

// importing axios for making API calls 
import axios from 'axios';



// importing icons for airlines 
import IndigoIcon from './images/IndiGo.svg'; 
import SkyHighAirwaysIcon from './images/sky.png'; 
import QatarIcon from './images/Qatar.svg'; 
import EmiratesIcon from './images/Emirates.svg'; 



const FlightList = () => {
  const location = useLocation();

  // initial flights data that we are getting from the API
  const flight_data = location.state.response;

  
  // console.log(flight_data);
  // console.log("The type of flight_data we are generating is ", typeof(flight_data));

  // top airlines that we are showing in the filter 
  const airlines = [
    { name: 'Indigo', type: 'domestic', icon: <img src={IndigoIcon} alt="Indigo" className="w-6 h-6" /> },
    { name: 'SkyHigh Airways', type: 'international', icon: <img src={SkyHighAirwaysIcon} alt="SkyHigh Airways" className="w-6 h-6" /> },
    { name: 'Qatar', type: 'international', icon: <img src={QatarIcon} alt="Qatar" className="w-6 h-6" /> },
    { name: 'Emirates', type: 'international', icon: <img src={EmiratesIcon} alt="Emirates" className="w-6 h-6" /> },
  ];


  // setting the state for selected airlines and filtered flights
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState(flight_data);



  //handling the checkbox change 
  const handleCheckboxChange = (airline) => {
    setSelectedAirlines(prevState =>
      prevState.includes(airline)
        ? prevState.filter(item => item !== airline)
        : [...prevState, airline]
    );
  };

  // clearing the filters
  const clearFilters = () => {
    setSelectedAirlines([]);
  };

  // calling the API to get the filtered flights
  useEffect(() => {
    const fetchFilteredFlights = async () => {
      try {
        if (selectedAirlines.length) {
          const response = await axios.get('http://localhost:3000/filter/', {
            params: {
              airlines: selectedAirlines.join(',')
            }
          });
          setFilteredFlights(response.data);
        } else {
          setFilteredFlights(flight_data);
        }
      } catch (error) {
        console.error('Error fetching filtered flights:', error);
      }
    };

    fetchFilteredFlights();
  }, [selectedAirlines, flight_data]);

  

  return (
    <div className="flex p-6">
      <div className="w-1/5 p-4 bg-gray-100 rounded-lg shadow-md border border-black h-64 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Filter by Airline</h2>
        {airlines.map((airline, index) => (
          <div key={index} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedAirlines.includes(airline.name)}
                onChange={() => handleCheckboxChange(airline.name)}
              />
              <span className="ml-2 flex items-center">
                {airline.icon}
                <span className="ml-2">{airline.name}</span>
              </span>
            </label>
          </div>
        ))}
        <button
          className="bg-red-500 text-white rounded-lg px-4 py-2 mt-4"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>
      <div className="w-4/5 p-4">
        {filteredFlights.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          <ul>
            {filteredFlights.map((flight, index) => (
              <li key={index}>
                <MainPage flight={flight} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FlightList;
