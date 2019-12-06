const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const knex = require('knex');
const cors = require('cors');

const config = require('./config');
const port = process.env.PORT || 9000;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.json());
app.use(cors());

app.use(morgan('dev'));
app.set('jwt-secret', config.secret);

// api 
app.use('/api/auth', require('./api/auth'));
app.use('/api/posts', require('./api/posts'));
app.use('/api/summary', require('./api/summary'));
app.use('/', (req, res) => {
  res.send('Hello JWT');
});

// server 띄우기
app.listen(port, function(){
  console.log('listening on port:' + port);
});
