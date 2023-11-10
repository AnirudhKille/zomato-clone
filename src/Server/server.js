const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./Routers/index1");

const app = express();
const port = process.env.YOUR_PORT || process.env.PORT || 8900;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

app.use("/", routes);

const { MongoClient } = require("mongodb");

// MongoDB Connection String
const uri = "mongodb+srv://your_username:your_password@cluster0.mongodb.net/your_database?retryWrites=true&w=majority";

const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on 0.0.0.0:${port}`);
});
