// const http = require('http');
// var express = require('express');
// var app = express();

// // Start the server on port 3000
// app.listen(3000, '127.0.0.1');
// console.log('Node server running on port 3000');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

var tutorialApi = require("./app/routes/tutorial.routes");

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Server Works like a charm." });
});

// set port, listen for requests



const api = require("./app/routes/tutorial.routes")(app);
const payment = require("./app/routes/payment.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");


db.sequelize.sync({force: false}).then(()=> {
    console.log("Drop table and resync")
});