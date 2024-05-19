import React, { useState, useEffect } from 'react';
import './addVehicle.css';

export default function AddVehicle() {
  const [scenarios, setScenarios] = useState([]);
  const [scenario, setScenario] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [speed, setSpeed] = useState();
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [direction, setDirection] = useState('');

  useEffect(() => {
    // Fetch scenarios from the backend
    const fetchScenarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/scenario');
        const data = await response.json();
        setScenarios(data);
      } catch (error) {
        console.error('Error fetching scenarios:', error);
      }
    };

    fetchScenarios();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    const newVehicle = {
      id: scenario, // Scenario ID is sent here
      x: positionX,
      y: positionY,
      direct: direction,
      speed: speed,
      v_name: vehicleName,
    };

    try {
      const response = await fetch('http://localhost:5000/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVehicle),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Vehicle added:', result);
        handleReset();
      } else {
        console.error('Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setScenario('');
    setVehicleName('');
    setSpeed('');
    setPositionX('');
    setPositionY('');
    setDirection('');
  };

  const handleGoBack = () => {
    // Handle go back logic here
  };

  return (
    <div className="add-vehicle-page">
      <h1>Add Vehicle</h1>
      <form onSubmit={handleAdd}>
        <div className="form-group">
          <label htmlFor="scenario">Scenarios List</label>
          <select
            id="scenario"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          >
            <option value="">Select Scenario</option>
            {scenarios.map((scen) => (
              <option key={scen.id} value={scen.id}>
                {scen.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="vehicleName">Vehicle Name</label>
          <input
            type="text"
            id="vehicleName"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="speed">Speed</label>
          <input
            type="number"
            id="speed"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="positionX">Position X</label>
          <input
            type="number"
            id="positionX"
            value={positionX}
            onChange={(e) => setPositionX(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="positionY">Position Y</label>
          <input
            type="number"
            id="positionY"
            value={positionY}
            onChange={(e) => setPositionY(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="direction">Direction</label>
          <select
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="">Select Direction</option>
            <option value="towards">Towards</option>
            <option value="backwards">Backwards</option>
            <option value="upwards">Upwards</option>
            <option value="downwards">Downwards</option>
          </select>
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-add">Add</button>
          <button type="button" className="btn btn-reset" onClick={handleReset}>Reset</button>
          <button type="button" className="btn btn-back" onClick={handleGoBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
}
