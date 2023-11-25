import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Heading */}
      <h2 className='text-center fs-1 fw-bolder mt-5'>Welcome To Sales App </h2>

      {/* Registration Prompt */}
      <p className='text-center fs-5 mt-4'> For Registration, Go To the register Page <Link to='/register'>click here </Link> </p>
    </div>
  );
};

export default Home;
