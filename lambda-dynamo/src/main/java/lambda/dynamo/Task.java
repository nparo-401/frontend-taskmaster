package lambda.dynamo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.ArrayList;
import java.util.Date;

@DynamoDBTable(tableName = "taskmaster")
public class Task {
  private String id;
  private String title;
  private String description;
  private String status;
  private String assignee;
  private ArrayList<History> history;
  private String image;

  public Task () {
  }

  public Task (String title, String description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = "Available";
    this.assignee = "none";
    this.history = new ArrayList<>();
  }

  public Task (String id, String title, String description, String status, String assignee) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.assignee = assignee;
    this.history = new ArrayList<>();
  }

  @DynamoDBHashKey
  @DynamoDBAutoGeneratedKey
  public String getId () {
    return id;
  }

  public void setId (String id) {
    this.id = id;
  }

  @DynamoDBAttribute
  public String getTitle () {
    return title;
  }

  public void setTitle (String title) {
    this.title = title;
  }

  @DynamoDBAttribute
  public String getDescription () {
    return description;
  }

  public void setDescription (String description) {
    this.description = description;
  }

  @DynamoDBAttribute
  public String getStatus () {
    return status;
  }

  public void setStatus (String status) {
    this.status = status;
  }
  
  public void updateStatus() {
    if (this.status.equals("Assigned")) {
      this.status = "Accepted";
    } else if (this.status.equals("Accepted")) {
      this.status = "Finished";
    }
  }

  @DynamoDBAttribute
  public String getAssignee () { return assignee; }

  public void setAssignee (String assignee) { this.assignee = assignee; }

  @DynamoDBAttribute
  public ArrayList<History> getHistory() {
    return history;
  }

  public void setHistory(ArrayList<History> history) {
    this.history = history;
  }

  public void addHistory(){
    History history = new History(this.status, this.assignee);
    this.history.add(history);
  }

  @DynamoDBAttribute
  public String getImage () {
    return image;
  }

  public void setImage (String image) {
    this.image = image;
  }
}
