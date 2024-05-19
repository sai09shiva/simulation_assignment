// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;







app.use(cors());
app.use(express.json())

app.use(require("./routes/scenario"))
app.use(require("./routes/vehicle"))



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

