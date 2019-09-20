import React from 'react';

export default function UpdateStatus(props) {
  function _updateStatus() {
    let API = `${props.api}/${props.data.id}/state`;

    fetch(API, 
      {
        method: 'PUT',
        mode: 'cors'
      }
    )
      .then( () => props.reload() );
  }

  return (
    <button onClick={_updateStatus}>Update Status</button>
  )
}
