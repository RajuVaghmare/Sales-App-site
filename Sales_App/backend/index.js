const express = require('express');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// CORS middleware to handle cross-origin requests
const cors = require('cors');
app.use(cors());

// Routes for registration, sales, and total revenue
app.use(require('./routes/reg_api'));
app.use(require('./routes/AddSales'));
app.use(require('./routes/Totalrevenue'));

// Start the Express server on port 5000
app.listen(5000, () => {
    console.log('Connected to Express server on port 5000');
});

// Connect to MongoDB database
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./confij'); // Assuming a typo correction 'confij' to 'config'

mongoose.connect(MONGODB_URL)
    .then(() => console.log('Database Connected!'))
    .catch((err) => { console.log(err) });

// Import the user schema
require('./schema/user_Model');
