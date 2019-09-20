# frontend-taskmaster

### Description
TaskMaster allows a user to create a task, assign that task to a new user, move the task through the status changes ("Available" -> "Assigned" -> "Accepted -> "Finished"), and delete the tasks.

### Screenshot
![screenshot](./frontend-taskmaster/src/assets/taskmaster.png)

### Links
* [Frontend](http://taskmaster-np.s3-website-us-west-2.amazonaws.com/)
* [Backend](https://cdmrys6wnc.execute-api.us-west-2.amazonaws.com/dev)

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

### Lambda Functions
* Added an image resizer function which saved the image from one bucket to another and resized it to a 50px X 50px image.
* Sticking point: was using the wrong Node dependency within Lambda and was unable to use the function because of that.
* Added a controller to add new database entries with lambda and an event trigger for the database to trigger when a change occurs.