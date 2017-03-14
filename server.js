const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
const models = db.models;

const app = express(); 

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

app.use('/', require('./routes'));


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

db.seed()
  .then( ()=> console.log('seeded'))
  .catch( (er) => console.log(er));

