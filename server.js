// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")
// Start up an instance of app
const app = express()
/* Middleware*/
const bodyParser = require("body-parser")
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const portNumber = 3000;
// Setup Server
app.listen(portNumber, () => {
    console.log(`Server Running now on port ${portNumber}`);
})

app.get("/get_weather", (req, res) => {
  res.send(projectData)
})

app.post("/saveWeatherData", (req, res) => {
  projectData = {...req.body}
  res.end()
})

