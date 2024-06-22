import React, { useState, useEffect } from 'react';
import kk from './images/kk.png';
import cities from './Airports.json';

const FlightSearch = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  useEffect(() => {
    const filterCities = (query, setSuggestions) => {
      const filteredCities = cities
        .filter(city => city.name.toLowerCase().includes(query.toLowerCase()))
        .map(city => `${city.name}, ${city.country} (${city.airport})`);

      setSuggestions(filteredCities);
    };

    if (fromCity || showFromSuggestions) filterCities(fromCity, setFromSuggestions);
    if (toCity || showToSuggestions) filterCities(toCity, setToSuggestions);
  }, [fromCity, toCity, showFromSuggestions, showToSuggestions]);

  const handleSuggestionClick = (suggestion, setCity, setShowSuggestions) => {
    setCity(suggestion.split(',')[0].trim()); // Trim spaces around the city name
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Add logic for submitting the form data
  };

  const handleKeyPress = (e, setCity, setShowSuggestions, suggestions) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      setCity(suggestions[0].split(',')[0].trim()); // Fill input with first suggestion
      setShowSuggestions(false);
    }
  };

  return (
    <section className="p-4 bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <h1 className="text-4xl mb-2 font-bold text-white">Fly High With Us!</h1>
        <h2 className="text-2xl text-white">GG FLIGHTS</h2>
        <img src={kk} alt="Airplane" className="mx-auto my-4" />
      </div>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="bg-gray-100 p-6 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">From</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={fromCity}
                  onChange={e => setFromCity(e.target.value)}
                  onFocus={() => setShowFromSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowFromSuggestions(false), 200)}
                  onKeyPress={e => handleKeyPress(e, setFromCity, setShowFromSuggestions, fromSuggestions)}
                  placeholder="Enter departure city"
                />
                {showFromSuggestions && fromSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                    {fromSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onMouseDown={() => handleSuggestionClick(suggestion, setFromCity, setShowFromSuggestions)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-700">To</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={toCity}
                  onChange={e => setToCity(e.target.value)}
                  onFocus={() => setShowToSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowToSuggestions(false), 200)}
                  onKeyPress={e => handleKeyPress(e, setToCity, setShowToSuggestions, toSuggestions)}
                  placeholder="Enter destination city"
                />
                {showToSuggestions && toSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                    {toSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onMouseDown={() => handleSuggestionClick(suggestion, setToCity, setShowToSuggestions)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Depart</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value=""
                  placeholder="Select departure date"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Return</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value=""
                  placeholder="Select return date"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Adults</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue=""
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Kids</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue=""
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Infant</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  defaultValue=""
                  placeholder="0"
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg">
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
