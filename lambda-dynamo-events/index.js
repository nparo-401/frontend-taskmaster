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
    body: JSON.stringify(data.Items)
  }
};

exports.handlerAssignee = async (event, context) => {
  let params = {
    TableName: 'taskmaster',
    Key: {
      'id': `${event.pathParameters.user}`
    },
    UpdateExpression: 'set assignee = :assignee',
    ExpressionAttributeValues: {
      ':assignee' : `${event.pathParameters.assignee}`,
    },
    ReturnValues: "UPDATED_NEW"
  };

  const data = await ddbClient.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
};

exports.handlerDeleter = async (event, context) => {
  let params = {
    TableName: 'taskmaster',
    Key: {
      'id': `${event.pathParameters.user}`
    }
  };

  const data = await ddbClient.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
};