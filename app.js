const  express = require('express');
const  bodyParser = require('body-parser');
const  morgan = require('morgan');
const  mongoose = require('mongoose');
const  routers = require('./server/routes');
const cors = require('cors');

const app = express();

// environment variables for jwt token
require('dotenv').config();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mydb', {useNewUrlParser: true})
  .catch(err => console.error(err));


// App Setup
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routers);

// Custom middleware to handle errors
app.use((err, req, res, next) => {
  console.log('Error:', err.message);
  res.status(422).json(err.message);
});

app.listen(8000);
console.log('Listening to port 8000');