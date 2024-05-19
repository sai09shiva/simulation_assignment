import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddScenario.css'; // Make sure this file is created with the styles

export default function AddScenario() {
  const [name, setName] = useState("");
  const [time, setTime] = useState();
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (name.trim() && time > 0) {
      const newScenario = { name, time };

      try {
        const response = await fetch('http://localhost:5000/scenario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newScenario),
        });

        if (response.ok) {
          console.log("Scenario Added:", newScenario);
          // Reset the form
          setName("");
          setTime(0);
        } else {
          alert("Failed to add scenario.");
        }
      } catch (error) {
        console.error('Error adding scenario:', error);
        alert("Error adding scenario.");
      }
    } else {
      alert("Please enter valid scenario name and time.");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setName("");
    setTime();
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1); // This navigates back to the previous page
  };

  return (
    <div className="add-scenario-page">
      <h1>Add Scenario</h1>
      <div className="form-back">
        <form>
          <div className="form-group">
            <label htmlFor="name">Scenario Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="time">Scenario Time (seconds)</label>
            <input
              type="number"
              id="time"
              placeholder="0"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
            />
          </div>
          <div className="button-group">
            <button onClick={handleAdd} className="btn btn-add">Add</button>
            <button onClick={handleReset} className="btn btn-reset">Reset</button>
            <button onClick={handleGoBack} className="btn btn-back">Go Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}
