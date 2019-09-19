exports.handler = (event, context, callback) => {
  console.log('Old Image:', event.Records[0].dynamodb.OldImage);
  console.log('New Image:', event.Records[0].dynamodb.NewImage);
};
