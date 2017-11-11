/* ===================
   Import Node Modules
=================== */
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application


const router = express.Router(); // Creates a new router object.
const path = require('path'); // NodeJS Package for file paths
const contact = require('./routes/contact')(router); // Import Contact Routes
const download = require('./routes/download')(router); // Import Download Routes
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const port = process.env.PORT || 8080; // Allows heroku to set port

// Middleware
app.use(cors({ origin: 'http://localhost:4200' })); // Allows cross origin in development only
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/public')); // Provide static directory for frontend
app.use('/contact', contact); // Use Contact routes in application
app.use('/download', download); // Use Download routes in application

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Start Server: Listen on port 8080
app.listen(port, () => {
  console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});

