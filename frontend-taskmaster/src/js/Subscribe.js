import React, {useState} from 'react';

export default function Subscribe(props) {
  let API = `${props.api}/subscribe`;
  const [subscribe, setSubscribe] = useState({});

  const _handleChange = e => {
    setSubscribe( {...subscribe, [e.target.name]:e.target.value});
  }

  const _subscribeTo = e => {
    fetch(API, 
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscribe)
      })
      .then( response => response.json() )
      .then( () => props.reload() );
  }

  return (
    <form onSubmit={_subscribeTo} className="flex-item">
      <fieldset>
        <legend>Subscribe for messages</legend>
        <label htmlFor="phoneNumber"><b>Phone Number</b></label>
        <input onChange={_handleChange} type="number" name="phoneNumber" id="phoneNumber" placeholder="11231231234"/>
        <button type="submit">Subscribe</button>
      </fieldset>
    </form>
  )
}
