import $ from 'jquery';

const ManagerSelect = ({ user, managers, setManager })=> {
  const managerOptions = (user, managers)=> {
    let options = [`<option value=''>None</option>`];
    return options.concat(managers.map( manager => {
      if(user.manager && manager.id === user.manager.id)
        return `<option selected value='${manager.id}'>${manager.name}</option>`;
      return `<option value='${manager.id}'>${manager.name}</option>`;
    }));
  };

  const select = $(`
        <select class='form-control'>
          ${managerOptions(user, managers)}
        </select>
      `);
  select.on('change', ()=> {
    setManager(user, select.val());
  }); 
  const container = $('<form-group><label>Managed By</label></form-group>');
  container.append(select);
  return container;
} 

export default ManagerSelect;
