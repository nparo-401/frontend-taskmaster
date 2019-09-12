import React from 'react';

export default function UpdateStatus(props) {
  function _updateStatus() {
    let API = `http://taskmaster-env.3nz9fretef.us-west-2.elasticbeanstalk.com/api/v1/tasks/${props.data.id}/state`;

    fetch(API, {
      method: 'PUT',
      mode: 'cors'
    }).then( () => props.reload() );
  }

  return (
    <button onClick={_updateStatus}>Update Status</button>
  )
}