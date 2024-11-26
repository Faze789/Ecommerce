const express = require("express");
const mongoose = require('mongoose');
const router = require('./router/routes');
const cors = require('cors');  // Import the CORS library

const app = express();
const PORT = 209;
app.use(cors({
    origin: '*', // Replace with specific origin(s) if needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow credentials (if necessary)
    optionsSuccessStatus: 204 // Response status for preflight requests
}));

app.use(express.json());
app.use('/', router);

const dbURI = 'mongodb+srv://khad1234:khad1234@cluster0.hekpe.mongodb.net/first';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to the database.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

