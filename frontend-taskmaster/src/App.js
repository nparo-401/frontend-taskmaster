import React, {useState, useEffect} from 'react';

import History from './js/History.js';
import AssignUser from './js/AssignUser.js';
import UpdateStatus from './js/UpdateStatus.js';
import DeleteTask from './js/DeleteTask.js';
import AddTask from './js/AddNewTask.js';

const API = 'http://taskmaster-env.3nz9fretef.us-west-2.elasticbeanstalk.com/api/v1/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then( data => data.json() )
      .then( fetchedTasks => {
        setTasks(fetchedTasks);
      });
  }

  useEffect( _getTasks, []);

  return (
    <React.Fragment>
      <header className="jumbotron">
        <h1>TaskMaster</h1>
      </header>
      <div className="App container">
        <h1>Task List</h1>
        <ul>
          {tasks.map( task => {
            return (
              <li key={task.id}>
                <details>
                  <summary>
                    <span>{task.title}</span><br/>
                  </summary>
                  <History history={task.history}/>
                  <AssignUser data={task} reload={_getTasks}/>
                  <UpdateStatus data={task} reload={_getTasks}/>
                  <br/>
                  <DeleteTask data={task} reload={_getTasks}/>
                </details>
              </li>
            )
          })}
        </ul>
        <AddTask reload={_getTasks}/>
      </div>
    </React.Fragment>
  );
}

export default App;
