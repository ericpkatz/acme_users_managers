import $ from 'jquery';
import ManagerSelect from './ManagerSelect';

const UserPanel = ({ user, managers, setManager, promoteToManager, demoteFromManager })=> {
  let button = `<button class='btn btn-primary'>Promote To Manager</button>`;
  if(user.isManager){
    button = `<button class='btn btn-danger'>Demote from Manager</button>`;
  }
  const panel = $(`
    <div class='panel panel-default'>
      <div class='panel-heading'>
        ${ user.name }
      </div>
      <div class='panel-body'>
        <div class='form-group'>
          ${button}
        </div>
      </div>
    </div>
  `);
  $('.panel-body', panel).append(ManagerSelect({ user, managers, setManager }));

  $('.btn-primary', panel).on('click', ()=> promoteToManager(user));
  $('.btn-danger', panel).on('click', ()=> demoteFromManager(user));
  return panel;
};

export default UserPanel;
