import React from 'react';

const MainPageCard = ({ flight }) => {
  if (!flight) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center text-sm">
      <div className="flex items-center">
        <img src="/path/to/airline/logo.png" alt={flight.airlinename} className="w-10 h-10 mr-4"/>
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
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2">View Prices</button>
      </div>
    </div>
  );
};

export default MainPageCard;