//import logo from './logo.svg';
import './App.css';
import React from 'react';
//import {Rea from 'react-dom';
import { BrowserRouter,Routes,Route} from 'react-router-dom'; 


import Navbar from './components/Navbar';
import AddScenario from './components/AddScenario';
import AllScenarios from './components/AllScenario';
import AddVehicle from './components/AddVehicle';
//import Home from './components/Home';
import HomePage from './components/Home';



function App() {
  return (
    <BrowserRouter>
      <div className="app">
          <div className='navbar'>
            <Navbar/>
          </div>
        
          <div className='content-container'>
            <Routes>
              <Route path="/" element={<HomePage/>}></Route>
              <Route path="/addscenario" element={<AddScenario/>}></Route>
              <Route path="/allscenario" element={<AllScenarios/>}></Route>
              <Route path="/addvehicle" element={<AddVehicle/>}></Route>
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;


