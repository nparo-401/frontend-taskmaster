const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const parser = require('lambda-multipart-parser');

AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();

exports.getAllForOneUser = async (event) => {
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
}
