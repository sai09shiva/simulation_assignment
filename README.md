# Simulation Assignment

This project is a simulation assignment that involves selecting scenarios, managing vehicles within those scenarios, and running simulations to observe vehicle movements. It includes a frontend client built with React and a backend server.

## Table of Contents

    - [Features](#features)
    - [Technologies](#technologies)
    - [Setup](#setup)
    - [Usage](#usage)
    - [File Structure](#file-structure)
    - [Contributing](#contributing)
    - [License](#license)

## Features

    - Display scenarios and their associated vehicles.
    - Start and stop simulations of vehicle movements.
    - Vehicles move according to predefined directions and speeds.
    - Visual representation of vehicle movements on a grid.
    -  delete vehicles within a scenario and delete scenario

## Technologies

    - **Frontend**: React, CSS
    - **Backend**: Node.js, Express
    - **Database**: (used storage.josn to store data in json format,)
    - **Version Control**: Git

## Setup
      Install Dependencies
      For the client
      
      cd /client
      
      npm install
      
      For the server
      
      cd /server
      npm install

### Prerequisites

    - Node.js and npm installed on your machine
    - Git installed on your machine

### Running the Application

    
      git clone https://github.com/sai09shiva/simulation_assignment.git
      cd simulation_assignment
### Running the application

      Start the backend server
      
      cd server
      npm start
      The server will start running on http://localhost:5000.
      
      Start the frontend client
      
      cd client
      npm start
      The client will start running on http://localhost:3000.
      
      Usage
      Open the client in your browser by navigating to http://localhost:3000.
      Select a scenario from the dropdown menu.
      Observe the vehicles listed in the table.
      Click the "Start Simulation" button to start the simulation.
      Click the "Stop Simulation" button to stop the simulation.
### File Structure
    simulation_assignment/
    │
    ├── client/
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── HomePage.js
    │   │   │   ├── ...
    │   │   ├── App.js
    │   │   ├── index.js
    │   │   ├── ...
    │   ├── package.json
    │   └── ...
    │
    ├── server/
    │   ├── routes/
    │   │   ├── scenarioRoutes.js
    │   │   ├── vehicleRoutes.js
    │   │   ├── ...
    │   ├── models/
    │   │   ├── scenarioModel.js
    │   │   ├── vehicleModel.js
    │   │   ├── ...
    │   ├── app.js
    │   ├── server.js
    │   ├── package.json
    │   └── ...
    │
    |──databse/
    |   |
    |   |──storage.json
    |
    └── README.md

### License

    This `README.md` provides a comprehensive guide to understanding, setting up, and using your project. Feel free to modify it according to your specific project details and requirements.


