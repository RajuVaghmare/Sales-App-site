import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';

import AddSales from './Pages/AddSales';
import TopFiveSales from './Pages/TopFiveSales';
import TotalRevenue from './Pages/TotalRevenue';
import Register from "./Pages/Register";
import Login from './Pages/Login';
import Home from "./Pages/Home";



function App() {
  return (


    <>
     
       <Navbar />

        <Routes>
          <Route path="" element={<Home />}> </Route>
          <Route path="/addsales" element={<AddSales />}> </Route>
          <Route path="/topfivesales" element={<TopFiveSales />}> </Route>
          <Route path="/todayrevenue" element={<TotalRevenue />}> </Route>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/register" element={<Register />}> </Route>
        </Routes>
      
    </>
  );
}

export default App;
