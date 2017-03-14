const app = require('express').Router();
const path = require('path');
const db = require('./db');
const models = db.models;

module.exports = app;

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next)=> {
  models.User.findAll({ order: 'name', include: [ { model: models.User, as: 'manager'} ]})
    .then( users => res.send(users));
});

app.put('/api/users/:id', (req, res, next)=> {
  models.User.findById(req.params.id)
    .then( user => {
      Object.assign(user, req.body);
      if(user.managerId === '')
        user.managerId = null;
      return user.save();
    })
    .then( ()=> res.send(200));

});

app.get('/api/managers', (req, res, next)=> {
  models.User.findAll({ order: 'name', where: { isManager: true},  include: [ { model: models.User, as: 'employees'} ]})
    .then( users => res.send(users));

});
