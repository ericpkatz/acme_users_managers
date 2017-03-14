import $ from 'jquery';
import UserPanel from './UserPanel';

const UsersList = ({ containerId, managers, users, setManager, promoteToManager, demoteFromManager })=> {
  const container = $(containerId);
  container.empty();
  users.forEach( user => container.append(UserPanel({ user, managers, setManager, promoteToManager, demoteFromManager} )) );
};

export default UsersList;
