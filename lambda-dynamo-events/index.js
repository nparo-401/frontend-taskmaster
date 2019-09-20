const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const parser = require('lambda-multipart-parser');

// Our connections
AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let params = {
    ExpressionAttributeValues: {
      ':assignee' : `${event.pathParameters.user}`
    },
    FilterExpression: 'contains (assignee, :assignee)',
    TableName: 'taskmaster'
  };

  const data = await ddbClient.scan(params).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(data.Items)
  }
};

exports.handlerAssignee = async (event, context) => {
  let params = {
    TableName: 'taskmaster',
    Key: {
      'id': `${event.pathParameters.user}`
    },
    UpdateExpression: 'set assignee = :assignee, taskStatus = :taskStatus',
    ExpressionAttributeValues: {
      ':assignee' : `${event.pathParameters.assignee}`,
      ':taskStatus' : 'Assigned'
    },
    ReturnValues: "UPDATED_NEW"
  };

  const data = await ddbClient.update(params).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(data)
  }
};

exports.handlerStatus = async (event, context) => {
  let id = event.pathParameters.user;

  let params = {
    TableName: 'taskmaster',
    Item: {
      id: id
    }
  }

  const records = await ddbClient.scan(params).promise();
  let record;

  records.Items.map( rec => {
    if (rec.id === id) {
      record = rec;
    }
  })

  let newStatus;
  if (record.taskStatus === 'Assigned') {
    newStatus = 'Accepted';
  } else if (record.taskStatus === 'Accepted') {
    newStatus = 'Finished';
  }

  let taskUpdate = {
    TableName: 'taskmaster',
    Key: {
      'id': `${event.pathParameters.user}`
    },
    UpdateExpression: 'set taskStatus = :taskStatus',
    ExpressionAttributeValues: {
      ':taskStatus' : newStatus,
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

exports.handlerDeleter = async (event, context) => {
  let params = {
    TableName: 'taskmaster',
    Key: {
      'id': `${event.pathParameters.user}`
    },
  };

  const data = await ddbClient.delete(params).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(data)
  }
};
