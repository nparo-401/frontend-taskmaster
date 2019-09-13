import React, {useState} from 'react';

export default function AssignUser(props) {
  const [assignee, setAssignee] = useState({});
  let API = `${props.api}/${props.data.id}/assign/${assignee.assignee}`;

  const _handleChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setAssignee({[field]: value});
  }

  const _assignUser = (e) => {
    e.preventDefault();

    fetch(API, {
      method: 'PUT',
      mode: 'cors'
    }).then( () => props.reload() );
  }

  return (
    <form onSubmit={_assignUser}>
      <label className="user" htmlFor="assignee"><b>Assign a user</b></label>
      <input className="user" onChange={_handleChange} type="text" name="assignee" id="assignee" defaultValue={props.data.assignee}/>
    </form>
  )
}
