const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

exports.handler = async (event) => {
    const sns = new AWS.SNS();

    const params = {
      Protocol: 'sms',
      TopicArn: 'arn:aws:sns:us-west-2:830278276484:TaskComplete',
      Endpoint: '+' + JSON.parse(event.body).phoneNumber,
      ReturnSubscriptionArn: true || false,
    };
    
    const data = await sns.subscribe(params).promise();
    
    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials" : true
        },
        body: JSON.stringify(data),
    };
    
    return response;
};
