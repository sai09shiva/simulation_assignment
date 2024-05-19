const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const storage_path = 'C:\\Users\\saish\\Desktop\\assignment\\simulation\\database\\storage.json';
//const index_path='C:\\Users\\saish\\Desktop\\assignment\\database\\global.json';



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

  
//get all scenarios
router.get("/scenario",(req,res)=>{
  //console.log("invoked get request")
  const jsonData=readDataFromFile(storage_path);
  res.status(200).json(jsonData)
})

//add scenario
router.post("/scenario",(req,res)=>{
    

    let jsonData=readDataFromFile(storage_path);

    const existingIds = jsonData.map(jsonData => jsonData.id);
    let id = generateUniqueId(existingIds);

    const name=req.body.name;
    const time=req.body.time;
    let vehicle=[];
    const newobj={id,name,time,vehicle};

    //console.log(jsonData);

    jsonData.push(newobj);

    writeDataToFile(storage_path,jsonData);
  

    res.status(200).send("add new scenario successsful");
})

// delete specific scenario
router.delete("/scenario",(req,res)=>{
  const id_delete=req.body.id;
  const name_delete=req.body.name;

  let jsonData=readDataFromFile(storage_path);
  //console.log(typeof jsonData);
  if(jsonData.length==0){
    res.status(404).send("cannot delete since no scenrio exists")
  }
  new_json_data=jsonData.filter(item=> item.id !== id_delete) 

  console.log(new_json_data)
  writeDataToFile(storage_path,new_json_data);

  res.status(200).send("delete scenario succesfull")
})

// update scenario
router.patch("/scenario/time",(req,res)=>{
    const new_time=req.body.time;
     const id=req.body.id;

    // Read the JSON data from the file
    let jsonData = readDataFromFile(storage_path);

    // Find the index of the scenario with the specified ID
    const index = jsonData.findIndex(item => item.id === id);
  
    // If scenario with the specified ID is found
    if (index !== -1) {
      // Update the time attribute of the scenario with the new time value
      jsonData[index].time = new_time;
  
      // Write the updated data back to the file
      writeDataToFile(storage_path, jsonData);
  
      res.status(200).send("Update time successful");
    } 
    else {
      // Scenario with the specified ID not found
      res.status(404).send("Scenario not found");
    }
})


module.exports = router;