import $ from 'jquery';

const ManagersList = ({ containerId, managers })=> {
  const container = $(containerId);
  container.empty();

  const managerPanel = (manager)=> {
    const panel = $(`
      <div class='panel panel-default'>
        <div class='panel-heading'>
          ${ manager.name }
        </div>
        <div class='panel-body'>
          <em>manages....</em>
          <br />
          ${ manager.employees.map( employee => employee.name ).join(', ')}
        </div>
      </div>
    `);
    return panel;
  };

  managers.forEach( manager => container.append(managerPanel( manager )) );
};

export default ManagersList;
