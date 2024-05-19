import React, { useEffect, useState } from 'react';
import './AllScenario.css';
import { Link } from 'react-router-dom';

const AllScenarios = () => {
  const [scenarios, setScenarios] = useState([]);

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

  const handleDeleteAll = async () => {
    try {
      const response = await fetch('http://localhost:5000/scenarios', {
        method: 'DELETE',
      });
      if (response.ok) {
        setScenarios([]);
      } else {
        console.error('Failed to delete all scenarios');
      }
    } catch (error) {
      console.error('Error deleting all scenarios:', error);
    }
  };

  const handleDeleteScenario = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/scenario', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        setScenarios(scenarios.filter(scenario => scenario.id !== id));
      } else {
        console.error('Failed to delete scenario');
      }
    } catch (error) {
      console.error('Error deleting scenario:', error);
    }
  };
  

  return (
    <div className="all-scenarios-page">
  <h1>All Scenarios</h1>
  <div className="button-group">
    <Link to="/addscenario" className="btn btn-new">New Scenario</Link>
    <Link to="/addvehicle" className="btn btn-add">Add Vehicle</Link>
    <button className="btn btn-delete" onClick={handleDeleteAll}>Delete All</button>
  </div>
  <table className="scenarios-table">
    <thead style={{ backgroundColor: 'lightgrey' }}>
      <tr>
        <th>#</th>
        
        <th>Scenario Name</th>
        <th>Scenario Time</th>
        <th>Number of Vehicles</th>
        <th>Add Vehicle</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {scenarios.map((scenario, index) => (
        <tr key={scenario.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : 'lightgrey' }}>
          <td>{index + 1}</td>
  
          <td>{scenario.name}</td>
          <td>{scenario.time}</td>
          <td>{scenario.vehicles ? scenario.vehicles.length : 0}</td>
          <td>
            <Link to={`/addvehicle?scenarioId=${scenario.id}`} className="btn-icon btn-add-vehicle">+</Link>
          </td>
          <td>
            <Link to={`/editscenario/${scenario.id}`} className="btn-icon btn-edit">
              <span role="img" aria-label="edit">✏️</span>
            </Link>
          </td>
          <td>
            <button className="btn-icon btn-delete" onClick={() => handleDeleteScenario(scenario.id)}>
              <span role="img" aria-label="delete">🗑️</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default AllScenarios;
