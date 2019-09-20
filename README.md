# frontend-taskmaster

### Description
TaskMaster allows a user to create a task, assign that task to a new user, move the task through the status changes ("Available" -> "Assigned" -> "Accepted -> "Finished"), and delete the tasks.

### Screenshot
![screenshot](./frontend-taskmaster/src/assets/taskmaster.png)

### Links
* [Frontend](http://taskmaster-np.s3-website-us-west-2.amazonaws.com/)
* [Backend](https://cdmrys6wnc.execute-api.us-west-2.amazonaws.com/dev/tasks)

### API Routes:
* https://cdmrys6wnc.execute-api.us-west-2.amazonaws.com/dev/tasks
  * `POST` - add a new task
    * add a new task with a JSON object:
    ```
    {
      "title": "ADD A TITLE HERE",
      "description": "ADD A DESCRIPTION HERE"
    }
    ```
  * `GET` - get all tasks
* https://cdmrys6wnc.execute-api.us-west-2.amazonaws.com/dev/tasks/{user}
  * `GET` - get all tasks for a specific `assignee` (user)
  * `DELETE` - delete a specific task by `id` (user)
* https://cdmrys6wnc.execute-api.us-west-2.amazonaws.com/dev/tasks/{user}/assign/{assignee}
  * `PUT` - add an `assignee` (assignee) to a specific task by `id` (user)
* https://cdmrys6wnc.execute-api.us-west-2.amazonaws.com/dev/tasks/{user}/state
  * `PUT` - update the task's status by its `id` (user)

### Lambda Functions
* Java
  * `save` - handles the `POST` request to add a new task to the database
  * `getTasks` - handles the `GET` request to get all of the tasks from the database
* JavaScript
  * `getAllForOneUser` - handles the `GET` request to get all of the tasks for ONE user/assignee
  * `taskDelete` - handles the `DELETE` request to remove a task from the database
  * `updateAssignee` - handles the `PUT` request to add or update the assignee within a specific task. Also updates the history list with a new event
  * `changeStatus` - handles the `PUT` request to change the status of a specific task. Also updates the history list with a new event

### Resources
* Marisha Hoza
* Fabian Brooks
* Kevin Couture
* Melfi Perez
* [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [Stackoverflow Fetch](https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests)
* [HTML Fieldset](https://www.w3schools.com/tags/tag_fieldset.asp)
* [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)
* [Lambda Thumbnailer](https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html)
* [DynamozDB multi action](https://stackoverflow.com/questions/39382050/dynamodb-update-item-multi-action)
* [Create, Read, Update, and Delete an Item](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Js.03.html#GettingStarted.Js.03.03)
