import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Api_Url } from '../Config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_LOGIN } from '../Redux/Action';

const Login = () => {
  // State variables for email, password, and loader
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  // Redux hooks for dispatch and navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login Function
  const login = async (event) => {
    event.preventDefault();
    setLoader(true);
    const user = {
      email: Email,
      password: Password
    };
    try {
      // API call for user login
      const response = await axios.post(`${Api_Url}/login`, user);
      setEmail('');
      setPassword('');

      if (response.status === 200) {
        // Store token and user details in local storage
        localStorage.setItem("tokenhulululu", response.data.result.token);
        localStorage.setItem("user", JSON.stringify(response.data.result.user));

        // Dispatch user login action
        dispatch({type: USER_LOGIN, payload: response.data.result.user});
        setLoader(false);
        Swal.fire({
          icon: 'success',
          title: 'User Login Successfully',
        });
        navigate('/addsales');
      }
    } catch (error) {
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
      {/* Login Form */}
      <h1 className='text-center mt-3'> LOGIN FORM </h1>
      <div className='container col-10 col-sm-8 shadow-lg p-5 mt-3'>
        {loader ?
          <div className="text-center">
            <div className="spinner-border  text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> : ""
        }
        {/* Login Form */}
        <form onSubmit={(e) => login(e)}>
          <div className="mb-3">
            <label for="login-email" className="form-label">Email :</label>
            <input type="email" className="form-control" id="login-email" value={Email} onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="mb-3">
            <label for="login-password" className="form-label">Password :</label>
            <input type="password" className="form-control" id="login-password" value={Password} onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <button type="submit" className="btn btn-outline-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
