import React from 'react';
import MainPage from './MainPageCard';
import { useLocation } from 'react-router-dom';


const FlightList = () => {


  const location = useLocation();
  // console.log(The response at FlightResults is ${JSON.stringify(location.state.response)});

  // getting the response from the previous page and storing it in flights variable
  const flight_data=JSON.parse(JSON.stringify(location.state.response));

 

  console.log(flight_data)
  console.log("The type of flight_data we are generating is ",typeof(flight_data))

  return (
    <div>
      {flight_data.length === 0 ? (
        <p>No flights available.</p>
      ) : (
        <ul>
          {flight_data.map((flight, index) => (
            <li key={index}>
              <MainPage flight={flight} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlightList;