import React, {useState, useEffect} from 'react';

import History from './js/History.js';
import AssignUser from './js/AssignUser.js';
import UpdateStatus from './js/UpdateStatus.js';
import DeleteTask from './js/DeleteTask.js';
import AddTask from './js/AddNewTask.js';
import AddImage from './js/AddImage.js';
import Subscribe from './js/Subscribe.js';

function App() {
  const API = 'https://cdmrys6wnc.execute-api.us-west-2.amazonaws.com/dev/tasks';
  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then( data => data.json() )
      .then( fetchedTasks => {
        setTasks(fetchedTasks);
      });
  }

  useEffect( _getTasks, []);

  function _imager(task) {
    if(task.image !== "none") {
      return (
        <React.Fragment>
          {<img src={'https://nparo-imagesresized' + task.image.substring(20)} alt={task.title} />}
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <img src='https://placehold.it/50x50/111' alt={task.title} />
        </React.Fragment>
      )
    }
  }

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
                  {_imager(task)}
                  <p>{task.description}</p>
                  <History history={task.history}/>
                  <AssignUser api={API} data={task} reload={_getTasks}/>
                  <br/>
                  <UpdateStatus api={API} data={task} reload={_getTasks}/>
                  <br/>
                  {/* TODO: add image path within the API and properly link the CORs */}
                  {/* <AddImage api={API} data={task} reload={_getTasks}/> */}
                  <br/>
                  <DeleteTask api={API} data={task} reload={_getTasks}/>
                </details>
              </li>
            )
          })}
        </ul>
        <div id="flex-container">
          <AddTask api={API} reload={_getTasks}/>
          <Subscribe api={API} reload={_getTasks}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
