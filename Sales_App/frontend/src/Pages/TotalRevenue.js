import React, { useEffect, useState } from 'react';
import { Api_Url } from '../Config';
import axios from 'axios';

// TotalRevenue Component
const TotalRevenue = () => {
  // Configuration object for API requests
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("tokenhulululu")
    }
  };

  // State variable to store total revenue
  const [Revenue, setRevenue] = useState('');

  // Function to fetch total revenue data
  const total = async () => {
    try {
      const data = await axios.get(`${Api_Url}/Totalrevenue`, CONFIG_OBJ);
      // Extract total revenue amount from the response data
      const amount = data.data.totalAmount;
      // Set the total revenue to the state variable
      setRevenue(amount);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook to fetch total revenue on component mount
  useEffect(() => {
    total();
  }, []);

  // Render the component
  return (
    <div>
      {/* Display today's revenue */}
      <h3 className='text-center mt-5 '> TODAY'S REVENUE IS <span className='fs-3 text-success'> {` ${Revenue} `}  </span></h3>
    </div>
  );
};

export default TotalRevenue;
