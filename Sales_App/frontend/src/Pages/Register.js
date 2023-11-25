import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Api_Url } from '../../src/Config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Register Component
const Register = () => {
  // State variables for user registration
  const [First_name, setFirst_name] = useState("");
  const [Last_name, setLast_name] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  // Navigate hook for redirection
  const navigate = useNavigate();

  // Register Function
  const register = async (event) => {
    event.preventDefault();
    setLoader(true);
    const user = {
      first_name: First_name,
      last_name: Last_name,
      email: Email,
      password: Password
    };
    try {
      // API call for user registration
      const response = await axios.post(`${Api_Url}/register`, user);
      // Reset state variables to empty strings
      setFirst_name("");
      setLast_name("");
      setEmail('');
      setPassword('');

      if (response) {
        setLoader(false);
        // Show success alert and navigate to login page
        Swal.fire({
          icon: 'success',
          title: 'User Registered Successfully',
          text: 'Welcome...',
        });
      }
      navigate('/login');
    } catch (error) {
      // Handle registration error, show error alert
      setLoader(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.error,
      });
      console.error(error.response.data.error);
    };
  };

  return (
    <div>
      {/* Registration Form */}
      <h3 className='text-center mt-3'>REGISTRATION FORM</h3>
      <div className='container col-10 col-sm-8 shadow-lg p-5 mt-3'>
        {loader ?
          <div className="text-center">
            <div className="spinner-border  text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> : ""
        }
        {/* Registration Form */}
        <form onSubmit={(e) => register(e)}>
          <div className="mb-3">
            <label for="f-name" className="form-label">First Name :</label>
            <input type="text" className="form-control" id="f-name" value={First_name} onChange={(e) => { setFirst_name(e.target.value) }} />
          </div>
          <div className="mb-3">
            <label for="l-name" className="form-label">Last Name :</label>
            <input type="text" className="form-control" id="l-name" value={Last_name} onChange={(e) => { setLast_name(e.target.value) }} />
          </div>
          <div className="mb-3">
            <label for="reg-email" className="form-label">Email :</label>
            <input type="email" className="form-control" id="reg-email" value={Email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="mb-3">
            <label for="reg-password" className="form-label">Password :</label>
            <input type="password" className="form-control" id="reg-password" value={Password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          {/* If the submit button is visible, the user can log in multiple times if he clicks the submit button quickly many times - it's a bug */}
          {loader ? "" : <button type="submit" className="btn btn-primary w-100">Submit</button>}
        </form>
      </div>
    </div>
  );
};

export default Register;
