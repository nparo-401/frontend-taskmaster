const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

exports.handler = async (event, context) => {
    const sns = new AWS.SNS();
    
    const title = event.Records[0].dynamodb.NewImage.title.S;
    const assignee = event.Records[0].dynamodb.NewImage.assignee.S;
    const taskStatus = event.Records[0].dynamodb.NewImage.taskStatus.S;
    
    if (taskStatus === 'Finished') {
        let message = `Task: ${title}, assigned to ${assignee} has been marked as '${taskStatus}'`;
        
        console.log('Message:', message);
    
        const params = {
          Message: message,
          TopicArn: 'arn:aws:sns:us-west-2:830278276484:TaskComplete',
        };
        
        const data = await sns.publish(params, context.done).promise();
        
        const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*",
              "Access-Control-Allow-Credentials" : true
            },
            body: JSON.stringify(data),
        };
        return response;
    }
};
