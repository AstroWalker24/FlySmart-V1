// components/FlightSearch.js
import React from 'react';
import kk from './images/kk.png';

const FlightSearch = () => {
  return (
    <section className="p-4 bg-green-900 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <h1 className="text-4xl mb-2">Fly High With Us!</h1>
        <h2 className="text-2xl">GARUDA FLIGHTS</h2>
        <img src={kk} alt="Airplane" className="mx-auto my-4" />
      </div>
      
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="bg-gray-100 p-6 rounded-lg">
          <form>
            <div className="flex justify-between mb-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="trip" value="roundTrip" defaultChecked />
                  <span>Round Trip</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="trip" value="oneWay" />
                  <span>One Way</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" name="directFlights" />
                  <span>Direct Flights</span>
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">From</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue="Cairo"
                />
                <p className="text-sm text-gray-500">Cairo International Airport, Egypt</p>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">To</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue="Abu Dhabi"
                />
                <p className="text-sm text-gray-500">Abu International Airport, UAE</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Depart</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue="2023-01-12"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Return</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue="2023-01-19"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Adults</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue="2"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Kids</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue="1"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Infant</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue="1"
                />
              </div>
            </div>
            
            <div className="text-center">
              <button type="submit" className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-lg">
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FlightSearch;
