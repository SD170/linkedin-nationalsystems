const express = require('express');
const dotenv = require('dotenv');

//route
const users = require('./routes/users');

dotenv.config({path:'./config/config.env'});

const app = express();

//mount router
app.use('/api/v1/users/',users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`))