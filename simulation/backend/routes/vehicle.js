const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const storage_path = 'C:\\Users\\saish\\Desktop\\assignment\\database\\storage.json';




function readDataFromFile(filePath) {
    try {
      const data = fs.readFileSync(filePath);
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading data from file:', error);
      return [];
    }
}
  
  // Function to write data to the JSON file
function writeDataToFile(filePath, data) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log('Data written to file successfully.');
    } catch (error) {
      console.error('Error writing data to file:', error);
    }
}


//generate unique id each time while creting scenario
function generateUniqueId(existingIds) {
  let newId;
  do {
    newId = uuidv4();
  } while (existingIds.includes(newId));
  return newId;
}


router.post('/vehicle',(req,res)=>{
    let jsonData=readDataFromFile(storage_path);

    const { id, x, y, direct, speed, v_name } = req.body;

    // Find the scenario by ID
    let index=-1;
    let existingIds = []

    for (let i = 0; i < jsonData.length; i++) {
        // Access each JSON object using jsonData[i]
        const scenario = jsonData[i];
        //console.log(scenario);
        if(scenario.id===id){
            index=i;
        }
        const cur_vehicle=scenario.vehicle;
        for(let j=0;j<cur_vehicle.length;j++){
            existingIds.push(cur_vehicle[j]);
        }
      }
  
    if (index === -1) {
      return res.status(404).json({ error: 'Scenario not found' });
    }
  
    //console.log(existingIds);

    const v_id = generateUniqueId(existingIds);
  
    // Create a new vehicle object
    const newVehicle = {
      v_id,
      x,
      y,
      direct,
      speed,
      v_name
    };
  
    // Add the new vehicle to the scenario's vehicles array
    jsonData[index].vehicle.push(newVehicle);
    writeDataToFile(storage_path, jsonData);
  
    res.status(201).json(newVehicle);
})

router.delete('/vehicle',(req,res)=>{
    let jsonData=readDataFromFile(storage_path);

    const{id,v_id}=req.body;
    let index=-1;
    for(let i=0;i<jsonData.length;i++){
        let cur_scene=jsonData[i];
        if(cur_scene.id==id){
            index=i;
            let vehicles=cur_scene.vehicle;
            console.log(vehicles);
            let new_vehicle = vehicles.filter(vehicle => vehicle.v_id != v_id);
            console.log(new_vehicle);
            jsonData[i].vehicle=new_vehicle;
        }
    }

    writeDataToFile(storage_path, jsonData);
    res.status(200).send("deleted vehicle succefully");

}
)

module.exports = router;