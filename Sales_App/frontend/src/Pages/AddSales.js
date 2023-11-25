import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Api_Url } from '../../src/Config';
import Swal from 'sweetalert2';

const AddSales = () => {

  // State variables to manage form input and loading state
  const [ProductName, setProductName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Amount, setAmount] = useState("");
  const [loader, setLoader] = useState(false);

  // Configuration object for HTTP headers
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("tokenhulululu")
    }
  };

  // Function to handle form submission and add sales entry
  const AddSales = async (event) => {
    event.preventDefault();
    setLoader(true);

    // Prepare data object with form input
    const products = {
      product_name: ProductName,
      quantity: Quantity,
      amount: Amount
    };

    try {
      // Make a POST request to add sales entry
      const response = await axios.post(`${Api_Url}/addsales`, products, CONFIG_OBJ);

      // Check if the request was successful (status code 201)
      if (response.status === 201) {
        // Clear form input, stop loading, and show success alert
        setProductName('');
        setQuantity('');
        setAmount('');
        setLoader(false);
        Swal.fire({
          icon: 'success',
          title: 'Product Added Successfully ',
        });
      }
    } catch (error) {
      // If there is an error, stop loading and show error alert
      setLoader(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Some error occurred, please try again ',
      });
      console.log(error.response.data.error);
    }
  };

  return (
    <div className='row'>
      {/* Heading */}
      <h2 className='text-center mt-4'> ADD SALES ENTRY </h2>

      {/* Loader */}
      {loader ?
        <div className="text-center">
          <div className="spinner-border  text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> : ""
      }

      {/* Sales Entry Form */}
      <div className='container col-10 col-sm-8 shadow-lg p-5 mt-3'>
        <form onSubmit={(e) => AddSales(e)}>
          {/* Product Name Input */}
          <div className="mb-3">
            <label htmlFor="product-name" className="form-label">Product Name</label>
            <input type="text" className="form-control" id="product-name" value={ProductName} onChange={(e) => { setProductName(e.target.value) }} />
          </div>
          {/* Quantity Input */}
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input type="number" className="form-control" id="quantity" value={Quantity} onChange={(e) => { setQuantity(e.target.value) }} />
          </div>
          {/* Amount Input */}
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input type="number" className="form-control" id="amount" value={Amount} onChange={(e) => { setAmount(e.target.value) }} />
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddSales;
