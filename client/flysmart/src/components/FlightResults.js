// FlightResults.js

import React, { useState, useEffect, useRef } from 'react';
import MainPageCard from './MainPageCard';
import { useLocation, useNavigate } from 'react-router-dom';


// Dummy flight data for debugging 
const flights = [
  { time: '10:00 AM', duration: '2h', layover: 'None', price: 5000, rewards: '500 points', airline: 'Air India', date: '2024-06-23' },
  { time: '10:00 AM', duration: '2h', layover: 'None', price: 5000, rewards: '500 points', airline: 'Indigo', date: '2024-06-23' },
  { time: '1:00 PM', duration: '3h', layover: '1h', price: 6000, rewards: '600 points', airline: 'Indigo', date: '2024-06-24' },
  { time: '5:00 PM', duration: '1.5h', layover: 'None', price: 4500, rewards: '450 points', airline: 'Qatar Airways', date: '2024-06-25' },
  { time: '8:00 PM', duration: '2h', layover: '30m', price: 5500, rewards: '550 points', airline: 'Emirates', date: '2024-06-26' },
  { time: '11:00 AM', duration: '2.5h', layover: '1h', price: 5200, rewards: '520 points', airline: 'Air India', date: '2024-06-27' },
  { time: '3:00 PM', duration: '3.5h', layover: '2h', price: 6100, rewards: '610 points', airline: 'Indigo', date: '2024-06-28' },
  { time: '7:00 PM', duration: '1h', layover: 'None', price: 4700, rewards: '470 points', airline: 'Qatar Airways', date: '2024-06-29' },
  { time: '9:00 PM', duration: '2.5h', layover: '1h', price: 5300, rewards: '530 points', airline: 'Emirates', date: '2024-06-30' },
];


// function to generate dates for the next 30 days
const generateDates = (startDate, numDays) => {

  const dates = [];
  const start = new Date(startDate);
  for (let i = 0; i < numDays; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];
    const display = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    dates.push({ date: formattedDate, display });
  }
  return dates;
};


// FlightResults component
const FlightResults = () => {
  const location = useLocation();
  // console.log(`The response at FlightResults is ${JSON.stringify(location.state.response)}`);

  // getting the response from the previous page and storing it in flights variable
  const flight_data=JSON.parse(JSON.stringify(location.state.response));

 

  console.log(flight_data)
  console.log("The type of flight_data we are generating is ",typeof(flight_data))



  // flight_data['price'] = 
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [dates, setDates] = useState(generateDates(new Date(), 30));
  const [priceRange, setPriceRange] = useState([5000, 6100]);
  const scrollContainerRef = useRef(null);

  // console.log(flight_data);



  useEffect(() => {
    setDates(generateDates(startDate, 30));
  }, [startDate]);

  const handleAirlineSelect = (event) => {
    const airline = event.target.value;
    setSelectedAirlines((prevSelected) =>
      prevSelected.includes(airline)
        ? prevSelected.filter((a) => a !== airline)
        : [...prevSelected, airline]
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleScroll = (direction) => {
    const newStartDate = new Date(startDate);
    if (direction === 'left') {
      newStartDate.setDate(newStartDate.getDate() - 7);
    } else {
      newStartDate.setDate(newStartDate.getDate() + 7);
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newStartDate >= today) {
      setStartDate(newStartDate);
    }
  };

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value.split(',').map(Number));
  };

  const handleClearAll = () => {
    setSelectedAirlines([]);
  };

  const filteredFlights = flights.filter(flight => {
    return (
      (selectedAirlines.length ? selectedAirlines.includes(flight.airline) : true) &&
      flight.date === selectedDate &&
      flight.price >= priceRange[0] &&
      flight.price <= priceRange[1]
    );
  });

  const uniqueAirlines = Array.from(new Set(flights.map(flight => flight.airline)));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="relative mb-4 flex items-center">
        <button
          className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full shadow-md"
          onClick={() => handleScroll('left')}
        >
          &lt;
        </button>
        <div
          className="flex overflow-x-auto mx-4 border-2 border-black p-2 rounded-lg shadow-lg"
          ref={scrollContainerRef}
        >
          {dates.map((date, index) => (
            <div
              key={index}
              className={`p-4 cursor-pointer rounded-lg shadow-md mx-2 min-w-max ${selectedDate === date.date ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} ${new Date(date.date) < today ? 'pointer-events-none opacity-50' : ''}`}
              onClick={() => new Date(date.date) >= today && handleDateSelect(date.date)}
            >
              <div>{date.display}</div>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full shadow-md"
          onClick={() => handleScroll('right')}
        >
          &gt;
        </button>
      </div>
      <div className="flex">
        <div className="w-1/4 pr-4 border-2 border-gray-300 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Airlines</h2>
            <button className="text-sm text-blue-500" onClick={handleClearAll}>
              Clear All
            </button>
          </div>
          {uniqueAirlines.map((airline, index) => (
            <div key={index} className="mb-4">
              <input
                type="checkbox"
                id={`airline-${index}`}
                name="airline"
                value={airline}
                className="mr-2"
                checked={selectedAirlines.includes(airline)}
                onChange={handleAirlineSelect}
              />
              <label htmlFor={`airline-${index}`} className="font-semibold text-gray-700">
                {airline}
              </label>
            </div>
          ))}
        </div>
        <div className="w-3/4 pl-4">
          {filteredFlights.map((flight, index) => (
            <MainPageCard key={index} flight={flight} />
          ))}
        </div>
      </div>
      <div className="w-1/4 mt-8 border-2 border-gray-300 rounded-lg shadow-lg p-4">
        <h2 className="font-semibold mb-4">One Way Price</h2>
        <input
          type="range"
          min="5000"
          max="6100"
          value={priceRange.join(',')}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-gray-700 mt-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
