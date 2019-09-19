import React, {useState, useEffect} from 'react';

import History from './js/History.js';
import AssignUser from './js/AssignUser.js';
import UpdateStatus from './js/UpdateStatus.js';
import DeleteTask from './js/DeleteTask.js';
import AddTask from './js/AddNewTask.js';
import AddImage from './js/AddImage.js';

function App() {
  const API = 'https://cdmrys6wnc.execute-api.us-west-2.amazonaws.com/dev/tasks';
  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API, {
      mode: 'cors'
    })
      .then( data => data.json() )
      .then( fetchedTasks => {
        setTasks(fetchedTasks);
      });
  }

  useEffect( _getTasks, []);

  function _imager(task) {
    if(task.image !== null) {
      return (
        <React.Fragment>
          {/* <img src={task.image} alt={task.title}/> */}
          {/* <p></p> */}
          {<img src={'https://nparo-imagesresized' + task.image.substring(20)} alt={task.title} />}
        </React.Fragment>
      )
    }
  }

  function _thumbnail(image, title) {
    // console.log(image);
    if(image !== null) {
      _getTasks();
      return (
        <img src={image} alt={title} />
      )
    } else {
      return (
        <img src='https://placehold.it/50x50/111' alt={title} />
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
                  <History history={task.history}/>
                  <AssignUser api={API} data={task} reload={_getTasks}/>
                  <UpdateStatus api={API} data={task} reload={_getTasks}/>
                  <br/>
                  <AddImage api={API} data={task} reload={_getTasks}/>
                  <br/>
                  <DeleteTask api={API} data={task} reload={_getTasks}/>
                </details>
              </li>
            )
          })}
        </ul>
        <AddTask api={API} reload={_getTasks}/>
      </div>
    </React.Fragment>
  );
}

export default App;
