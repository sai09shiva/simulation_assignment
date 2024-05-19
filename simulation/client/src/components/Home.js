import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [scenarioTime, setScenarioTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    fetchScenarios();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setVehicles((prevVehicles) =>
          prevVehicles.map((vehicle) => {
            let { x, y, speed, direct } = vehicle;
            if (direct == 'Towards') {
              x += speed;
            } else if (direct == 'Upwards') {
              y -= speed;
            } else if (direct == 'Backwards') {
              x -= speed;
            } else if (direct == 'Downwards') {
              y += speed;
            }

            // Boundary check to stop the vehicle if it goes outside the grid
            if (x < 0 || x > 900 || y < 0 || y > 900) {
              return { ...vehicle, speed: 0 }; // Stop the vehicle
            }

            return { ...vehicle, x, y };
          })
        );

        setTimer((prevTimer) => {
          if (prevTimer >= scenarioTime) {
            setIsRunning(false);
            return prevTimer;
          }
          return prevTimer + 100;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isRunning, scenarioTime]);

  const fetchScenarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/scenario');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setScenarios(data);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };

  const handleScenarioChange = (event) => {
    const scenarioId = event.target.value;
    const scenario = scenarios.find((s) => s.id == scenarioId);
    if (scenario) {
      setSelectedScenario(scenario);
      setVehicles(scenario.vehicle || []);
      setScenarioTime(scenario.time || 0);
      setTimer(0);
    } else {
      setSelectedScenario(null);
      setVehicles([]);
      setScenarioTime(0);
    }
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  return (
    <div className="home-page">
      <div className="main-content">
        <div className="scenario-selector">
          <label>Scenario</label>
          <select value={selectedScenario?.id || ''} onChange={handleScenarioChange}>
            <option value="">Select a scenario</option>
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>
        </div>
        <table className="vehicle-table">
          <thead>
            <tr>
              <th>Vehicle Id</th>
              <th>Vehicle Name</th>
              <th>Position X</th>
              <th>Position Y</th>
              <th>Speed</th>
              <th>Direction</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.v_id}>
                <td>{vehicle.v_id}</td>
                <td>{vehicle.v_name}</td>
                <td>{vehicle.x}</td>
                <td>{vehicle.y}</td>
                <td>{vehicle.speed}</td>
                <td>{vehicle.direct}</td>
                <td><button className="edit-button">✎</button></td>
                <td><button className="delete-button">🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="simulation-controls">
          <button className="start-button" onClick={handleStart}>Start Simulation</button>
          <button className="stop-button" onClick={handleStop}>Stop Simulation</button>
        </div>
        <div className="grid">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.v_id}
              className="grid-item"
              style={{ left: `${vehicle.x}px`, top: `${vehicle.y}px` }}
            >
              <div className={`vehicle vehicle-${vehicle.v_id}`}>{vehicle.v_name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
