import React, {useState} from 'react';

export default function AddTask(props) {
  let API = `${props.api}`;
  const [formData, setFormData] = useState({});

  const _handleChange = e => {
    setFormData( {...formData, [e.target.name]:e.target.value});
  }

  const _setTask = e => {
    e.preventDefault();

    fetch(API, 
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then( response => response.json() )
      .then( () => props.reload() );
  }

  return (
    <form onSubmit={_setTask} className="flex-item">
      <fieldset>
        <legend>Add a new task:</legend>
        <div>
          <label htmlFor="title">Task Title</label>
          <input onChange={_handleChange} type="text" name="title" id="title"></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea onChange={_handleChange} type="text" name="description" id="description" rows="4" cols="50"></textarea>
        </div>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  )
}
