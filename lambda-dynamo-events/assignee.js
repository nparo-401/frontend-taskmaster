const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const parser = require('lambda-multipart-parser');

AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();

exports.updateAssignee = async (event) => {
  const id = event.pathParameters.user;
  const assignee = event.pathParameters.assignee;
  let historyArr = [];
  let history = {
    date: new Date().toString(),
    action: 'Assigned',
    assignee: assignee
  };
  let params = {
    TableName: 'taskmaster',
    Item: {
      id: id
    }
  };
  
  const records = await ddbClient.scan(params).promise();

  records.Items.map( rec => {
    if (rec.id === id) {
      rec.history.map( hist => historyArr.push(hist) );
      historyArr.push(history);
    }
  })

  let taskUpdate = {
    TableName: 'taskmaster',
    Key: {
      'id': id
    },
    UpdateExpression: 'SET assignee = :assignee, taskStatus = :taskStatus, history = :history',
    ExpressionAttributeValues: {
      ':assignee' : assignee,
      ':taskStatus' : 'Assigned',
      ':history' : historyArr
    },
    ReturnValues: "UPDATED_NEW"
  };

  const data = await ddbClient.update(taskUpdate).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(data)
  }
}
