import React from 'react';

export default function DeleteTask(props) {
  function _deleteTask() {
    let API = `http://taskmaster-env.3nz9fretef.us-west-2.elasticbeanstalk.com/api/v1/tasks/${props.data.id}/delete`;

    fetch(API, {
      method: 'DELETE',
      mode: 'cors'
    }).then( () => props.reload() );
  }

  return (
    <button onClick={_deleteTask}>Delete Task</button>
  )
}