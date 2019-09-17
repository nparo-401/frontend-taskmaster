import React from 'react';

export default function DeleteTask(props) {
  function _deleteTask() {
    let API = `${props.api}/${props.data.id}`;

    fetch(API, {
      method: 'DELETE',
      mode: 'cors'
    }).then( () => props.reload() );
  }

  return (
    <button onClick={_deleteTask}>Delete Task</button>
  )
}
