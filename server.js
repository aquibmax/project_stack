const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const myURL = require('./config/myURL')
const routes = require('./routes/routes')
const app = express()

//Middleware for bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongoDB configuration
const db = require("./config/myURL").mongoURL; 


//Attempt to connect to database

mongoOptions = { useNewUrlParser: true, dbName: 'project_stack', autoIndex: false, useUnifiedTopology: true}
mongoose
  .connect(db, mongoOptions)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

var secret = myURL.secret
app.set('secretKey', secret)

//templating engine
app.set('view engine', 'ejs')

//logging APIs
app.use(morgan('dev'))

//routes
app.use('/api', routes)






const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`App is running at ${port}`));