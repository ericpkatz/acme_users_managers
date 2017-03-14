const _conn = require('./_conn');

const User = _conn.define('user', {
  name: _conn.Sequelize.STRING,
  isManager: {
    type: _conn.Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  hooks: {
    beforeUpdate: function(user){
      if(!user.isManager)
        return User.update({ managerId: null }, { where: { managerId: user.id }});
    }
  }
});

//TODO if an employee is demoted, then remove their employees

module.exports = User;
