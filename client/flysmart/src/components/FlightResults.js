import React, { useState, useEffect } from 'react';
import MainPage from './MainPageCard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

import IndigoIcon from './images/IndiGo.svg';
import SkyHighAirwaysIcon from './images/sky.png';
import QatarIcon from './images/Qatar.svg';
import EmiratesIcon from './images/Emirates.svg';

const FlightList = () => {
  const location = useLocation();
  const flight_data = location.state.response || [];

  const airlines = [
    { name: 'Indigo', type: 'domestic', icon: <img src={IndigoIcon} alt="Indigo" className="w-6 h-6" /> },
    { name: 'SkyHigh Airways', type: 'international', icon: <img src={SkyHighAirwaysIcon} alt="SkyHigh Airways" className="w-6 h-6" /> },
    { name: 'Qatar', type: 'international', icon: <img src={QatarIcon} alt="Qatar" className="w-6 h-6" /> },
    { name: 'Emirates', type: 'international', icon: <img src={EmiratesIcon} alt="Emirates" className="w-6 h-6" /> },
  ];

  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState(flight_data);

  // setting the default price range
  const [priceRange, setPriceRange] = useState([5000, 7000]);

  const handleCheckboxChange = (airline) => {
    setSelectedAirlines(prevState =>
      prevState.includes(airline)
        ? prevState.filter(item => item !== airline)
        : [...prevState, airline]
    );
  };

  const clearFilters = () => {
    setSelectedAirlines([]);
    setPriceRange([5000,7000]);
  };



  const handlePriceChange = (event, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(event.target.value);
    setPriceRange(newRange);
  };

  useEffect(() => {
    const fetchFilteredFlights = async () => {
      try {
        if (selectedAirlines.length || priceRange[0] !== 5000 || priceRange[1] !== 7000) {
          const response = await axios.get('http://localhost:3000/filter/', {
            params: {
              airlines: selectedAirlines.join(','),
              minPrice: priceRange[0],
              maxPrice: priceRange[1]
            }
          });
          if (Array.isArray(response.data)) {
            console.log(response.data);
            setFilteredFlights(response.data);
          } else {
            setFilteredFlights([]);
            console.error('Unexpected response format:', response.data);
          }
        } else {
          setFilteredFlights(flight_data);
        }
      } catch (error) {
        console.error('Error fetching filtered flights:', error);
        setFilteredFlights([]);
      }
    };

    fetchFilteredFlights();
  }, [selectedAirlines, priceRange, flight_data]);

  return (
    <>

    <Navbar/>
    <div className="flex p-6">
      <div className="w-1/5 flex flex-col space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg shadow-md border border-black">
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
        <div className="p-4 bg-gray-100 rounded-lg shadow-md border border-black">
          <h2 className="text-xl font-semibold mb-4">Filter by Price</h2>
          <div className="flex flex-col">
            <label className="flex items-center mb-2">
              Min Price:
              <input
                type="range"
                min="5000"
                max="70000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="ml-2"
              />
              <span className="ml-2">₹{priceRange[0]}</span>
            </label>
            <label className="flex items-center mb-2">
              Max Price:
              <input
                type="range"
                min="5000"
                max="70000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="ml-2"
              />
              <span className="ml-2">₹{priceRange[1]}</span>
            </label>
          </div>
        </div>
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
    </>
  );
};

export default FlightList;
