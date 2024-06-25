import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import kk from './images/kk.png';
import flight from './images/flight_white.png';
import cargoImage from './images/cargo.png'; // Import the cargo image
import cities from './Airports.json';

const FlightSearch = () => {
  // updating fromCity field using serFromCity function
  const [fromCity, setFromCity] = useState('');

  const [queryreponse,setqueryresponse] = useState([]);

   // updating toCity field using setToCity function
   const [toCity, setToCity] = useState('');
   
  // updating Departure field using setDeparture function 
  const [Departure, setDeparture] = useState('');

  // updating Return field using setReturn function
  const [Return, setReturn] = useState('');


  // updating fromSuggestions field using setFromSuggestions function
  const [fromSuggestions, setFromSuggestions] = useState([]);

  // updating toSuggestions field using setToSuggestions function
  const [toSuggestions, setToSuggestions] = useState([]);

  // updating showFromSuggestions field using setShowFromSuggestions function
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);

  // updating showToSuggestions field using setShowToSuggestions function
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  
  const [loading, setLoading] = useState(false); // State to handle loading

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('http://localhost:3000/flights/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromCity: fromCity,
          toCity: toCity,
          DepartureDate: Departure,
          ReturnDate: Return,
        }),
      });

      if (response.ok) {
        response.json().then(data => {
            setTimeout(() => {
                setLoading(false);
                // convert each data object present in the data to json format and store in the array
                let data_array=JSON.parse(JSON.stringify(data));

                // add the price to the data_arary
                const price=Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000;
                data_array['price']=price;

                // store the data_array in the response_tobesend variable
                let response_tobesend=data_array;
              

                
                navigate('/flightResults', { state: { "response": response_tobesend } }); // Simulate navigation after delay
            }, 2000); // Delay to show the animation
        }).catch(error => {
            setLoading(false);
            console.error('Error parsing JSON response:', error);
        });
    } else {
        setLoading(false);
        console.log('Form Submission Failed');
    }
    } catch (error) {
        setLoading(false);
        console.log('An unknown error has occurred', error);
    }
    };
    

  const handleKeyPress = (e, setCity, setShowSuggestions, suggestions) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      setCity(suggestions[0].split(',')[0].trim()); // Fill input with first suggestion
      setShowSuggestions(false);
    }
  };

  return (
    <section className="p-4 bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
          <img
            src={cargoImage}
            alt="Loading"
            className="w-48 animate-fly-horizontal"
          />
          <p className="text-2xl font-bold text-gray-700 mt-4 text-center">Fasten your seatbelts...</p>
        </div>
      )}
      {!loading && (
        <>
          <div className="text-center mb-4">
            <h1 className="text-4xl mb-2 font-bold text-white">Fly High With Us!</h1>
            <h2 className="text-2xl text-white">GG FLIGHTS</h2>
            <img src={flight} alt="Airplane" className="mx-auto" width={600} height={600} />
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
                      value={Departure}
                      placeholder="Select departure date"
                      onChange={e => setDeparture(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Return</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={Return}
                      placeholder="Select return date"
                      onChange={e => setReturn(e.target.value)}
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
        </>
      )}
    </section>
  );
};

export default FlightSearch;
