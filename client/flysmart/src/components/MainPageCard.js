import React from 'react';

const MainPage = ({ flight }) => {
  if (!flight) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center text-sm">
      <div className="flex items-center">
        <img src="/path/to/airline/logo.png" alt={flight.airline} className="w-10 h-10 mr-4"/>
        <div>
          <div className="font-semibold">{flight.time}</div>
          <div className="text-gray-600">{flight.duration}</div>
          <div className="text-gray-600">{flight.layover}</div>
          <div className="text-gray-600">{flight.airline}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-lg">₹{flight.price}</div>
        <div className="text-gray-600">{flight.rewards}</div>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2">View Prices</button>
      </div>
    </div>
  );
};

export default MainPage;
