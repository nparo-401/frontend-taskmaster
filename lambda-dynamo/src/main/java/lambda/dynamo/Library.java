/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package lambda.dynamo;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import java.util.List;


public class Library {
    private DynamoDB dynamoDB;
    private String DYNAMODB_TABLE_NAME = "taskmaster";
    private Regions REGION = Regions.US_WEST_2;
    
    public Task save(Task incomingTask) {
        final AmazonDynamoDB ddb = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDBMapper ddbMapper = new DynamoDBMapper(ddb);
        Task task = new Task(
         incomingTask.getId(),
         incomingTask.getTitle(),
         incomingTask.getDescription()
        );
        
        ddbMapper.save(task);
        return task;
    }
    
    public List<Task> getTasks() {
        final AmazonDynamoDB ddb = AmazonDynamoDBClientBuilder.defaultClient();
        DynamoDBMapper ddbMapper = new DynamoDBMapper(ddb);
        return ddbMapper.scan(Task.class, new DynamoDBScanExpression());
    }
}
