const _conn = require('./_conn');

const User = require('./User');

User.belongsTo(User, { as: 'manager' });
User.hasMany(User, { as: 'employees', foreignKey: 'managerId' });

const sync = ()=> {
  return _conn.sync({force: true });
}

const seed = ()=> {
  let moe, larry;
  return sync()
    .then( ()=> Promise.all([
      User.create({ name: 'Moe', isManager: true }),
      User.create({ name: 'Larry', isManager: true }),
      User.create({ name: 'Curly' }),
      User.create({ name: 'Shep' })
    ]))
    .then( (result)=> {
      [moe, larry, curly, shep] = result;
      return Promise.all([ 
        larry.setManager(moe.id),
        curly.setManager(larry.id),
        shep.setManager(larry.id)
      ]);
    });
}

module.exports = {
  sync,
  seed,
  models: {
    User
  }
};
