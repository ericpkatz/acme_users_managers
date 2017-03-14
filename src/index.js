import $ from 'jquery';
import UsersList from './UsersList';
import ManagersList from './ManagersList';


const state = {};

let users, managers;

const loadDataFromServer = ()=> {
  Promise.all([
    $.get('/api/users'),
    $.get('/api/managers')
  ])
  .then( (result)=> {
    [ users, managers] = result;
    state.users = users;
    state.managers = managers;

    renderManagersList();
    renderUsersList();
  });
}

loadDataFromServer();




const setManager = (user, managerId)=> {
  $.ajax({
    method: 'put',
    url: `/api/users/${user.id}`,
    data: JSON.stringify({ managerId: managerId }),
    contentType: 'application/json'
  })
  .then( ()=> loadDataFromServer());
};

const demoteFromManager = (user)=> {
  $.ajax({
    method: 'put',
    url: `/api/users/${user.id}`,
    data: JSON.stringify({ isManager: false }),
    contentType: 'application/json'
  })
  .then( ()=> loadDataFromServer());
};

const promoteToManager = (user)=> {
  $.ajax({
    method: 'put',
    url: `/api/users/${user.id}`,
    data: JSON.stringify({ isManager: true }),
    contentType: 'application/json'
  })
  .then( ()=> loadDataFromServer());
};

const renderUsersList = ()=> {
  const containerId = '#usersList';
  const users = state.users;
  UsersList({ containerId, managers, users, setManager, promoteToManager, demoteFromManager }); 
};

const renderManagersList = ()=> {
  const containerId = '#managersList';
  const managers = state.managers;
  ManagersList({ containerId, managers }); 
}
