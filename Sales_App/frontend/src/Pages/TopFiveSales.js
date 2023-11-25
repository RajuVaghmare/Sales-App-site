import React from 'react';
import './TopFiveSales.css'; // Assuming you have a CSS file named TopFiveSales.css
import { Api_Url } from '../Config';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TopFiveSales = () => {
  const [Sales, setSales] = useState([]);

  // Configuration object for API requests
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("tokenhulululu")
    }
  };

  // Function to fetch top five sales data
  const topsales = async () => {
    try {
      const data = await axios.get(`${Api_Url}/topsales`, CONFIG_OBJ);
      setSales(data.data.sales);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hook to fetch top sales data on component mount
  useEffect(() => {
    topsales();
  }, []);

  // Render the component
  return (
    <div>
      {/* Top Five Sales Table */}
      <h1 className='text-center mt-3'> TODAY TOP FIVE SALES </h1>
      <div className=' container col-11 col-sm-8 mt-3 shadow-sm'>
        <table className="table">
          <thead>
            <tr className="row-divider">
              <th scope="col">#</th>
              <th scope="col">Sales Id:</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the sales data and render rows */}
            {Sales.map((sale, index) => (
              <tr key={sale._id}>
                <th scope="row">{index + 1}</th>
                <td>{sale._id}</td>
                <td>{sale.product_name}</td>
                <td>{sale.quantity}</td>
                <td>{sale.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopFiveSales;
