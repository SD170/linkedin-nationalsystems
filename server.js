const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');


//env variables
dotenv.config({path:'./config/config.env'});

//connect to DB
const db = connectDB();

//route file
const users = require('./routes/users');

const app = express();

//body parser
app.use(express.json());

//dev logging middleware
if(process.env.NODE_ENV==='development'){
	app.use(morgan('dev'));
}

//mount router
app.use('/api/v1/users/',users);

//error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

//handle unhandledRejection err
process.on('unhandledRejection', (err,promise)=>{
	console.log(`ERROR: ${err.message}`.red);

	//Close Server and exit process
	server.close(()=>process.exit(1));
})