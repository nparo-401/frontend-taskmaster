// dependencies
var async = require('async');
var AWS = require('aws-sdk');
var gm = require('gm').subClass({ imageMagick: true }); // Enable ImageMagick integration.
var util = require('util');
const parser = require('lambda-multipart-parser');

// constants
var MAX_WIDTH  = 50;
var MAX_HEIGHT = 50;

// get reference to S3 client
var s3 = new AWS.S3();

AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();

exports.uploadImage = async (event) => {
  // const image = handler(event);
  // const image = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  // const id = event.pathParameters.user;
  
  // let params = {
  //   TableName: 'taskmaster',
  //   Item: {
  //     id: id
  //   }
  // };
  // const records = await ddbClient.scan(params).promise();

  // records.Items.map( rec => {
  //   if (rec.id === id) {
      
  //   }
  // })

  // let taskUpdate = {
  //   TableName: 'taskmaster',
  //   Key: {
  //     'id': id
  //   },
  //   UpdateExpression: 'SET image = :image',
  //   ExpressionAttributeValues: {
  //     ':image' : image
  //   },
  //   ReturnValues: "UPDATED_NEW"
  // };
  // const data = await ddbClient.update(taskUpdate).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' ')))
  }
}

const handler = function(event, context, callback) {
// Read options from the event.
  console.log('Reading options from event:\n', util.inspect(event, {depth: 5}));
  var srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  var dstBucket = 'nparo-imagesresized';
  var dstKey = srcKey;

  // Sanity check: validate that source and destination are different buckets.
  if (srcBucket === dstBucket) {
    callback('Source and destination buckets are the same.');
    return;
  }

  // Infer the image type.
  var typeMatch = srcKey.match(/\.([^.]*)$/);
  if (!typeMatch) {
    callback('Could not determine the image type.');
    return;
  }
  var imageType = typeMatch[1].toLowerCase();
  if (imageType !== 'jpg' && imageType !== 'png') {
    callback(`Unsupported image type: ${imageType}`);
    return;
  }

  // Download the image from S3, transform, and upload to a different S3 bucket.
  async.waterfall([
    function download(next) {
    // Download the image from S3 into a buffer.
      s3.getObject({
        Bucket: srcBucket,
        Key: srcKey
      },
      next);
    },
    function transform(response, next) {
      gm(response.Body).size(function(err, size) {
        let width = MAX_WIDTH;
        let height = MAX_HEIGHT;

        // Transform the image buffer in memory.
        this.resize(width, height)
          .toBuffer(imageType, function(err, buffer) {
            if (err) {
              next(err);
            } else {
              next(null, response.ContentType, buffer);
            }
          });
      });
    },
    function upload(contentType, data, next) {
      // Stream the transformed image to a different S3 bucket.
      s3.putObject({
        Bucket: dstBucket,
        Key: dstKey,
        Body: data,
        ContentType: contentType,
        ACL: 'public-read'
      },
      next);
    }
  ], function (err) {
    if (err) {
      console.error(
        'Unable to resize ' + srcBucket + '/' + srcKey +
        ' and upload to ' + dstBucket + '/' + dstKey +
        ' due to an error: ' + err
      );
    } else {
      console.log(
        'Successfully resized ' + srcBucket + '/' + srcKey +
        ' and uploaded to ' + dstBucket + '/' + dstKey
      );
    }

    callback(null, 'message');
  });
  return dstBucket + '/' + dstKey;
};
