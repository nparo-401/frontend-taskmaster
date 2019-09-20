const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const parser = require('lambda-multipart-parser');

AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();

exports.changeStatus = async (event) => {
  let record;
  let newStatus;
  let id = event.pathParameters.user;
  let historyArr = [];
  let history = {};
  let params = {
    TableName: 'taskmaster',
    Item: {
      id: id
    }
  }
  let taskUpdate = {};
  const records = await ddbClient.scan(params).promise();

  records.Items.map( rec => {
    if (rec.id === id) {
      record = rec;
      rec.history.map( hist => historyArr.push(hist) );

      if (rec.taskStatus !== 'Finished') {
        if (record.taskStatus === 'Assigned') {
          newStatus = 'Accepted';
        } else if (record.taskStatus === 'Accepted') {
          newStatus = 'Finished';
        }
  
        history = {
          date: new Date().toString(),
          action: newStatus,
          assignee: rec.assignee
        };
        historyArr.push(history);
      }
    }
  })

  if (record.taskStatus === 'Finished') {
    taskUpdate = {
      TableName: 'taskmaster',
      Key: {
        'id': id
      }
    };
  } else {
    taskUpdate = {
      TableName: 'taskmaster',
      Key: {
        'id': id
      },
      UpdateExpression: 'set taskStatus = :taskStatus, history = :history',
      ExpressionAttributeValues: {
        ':taskStatus' : newStatus,
        ':history' : historyArr
      },
      ReturnValues: "UPDATED_NEW"
    };
  }
  
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
