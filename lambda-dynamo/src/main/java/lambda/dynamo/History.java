package lambda.dynamo;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.Date;

@DynamoDBDocument
public class History {
  private String date;
  private String action;
  private String assignee;

  public History(){}
  
  public History(String action) {
    this.date = new Date().toString();
    this.action = action;
    this.assignee = "none";
  }
  
  public History(String action, String assignee) {
    this.date = new Date().toString();
    this.action = action;
    this.assignee = assignee;
  }

  public String getDate () {
    return date;
  }

  public void setDate (String date) {
    this.date = date;
  }

  public String getAction () {
    return action;
  }

  public void setAction (String action) {
    this.action = action;
  }

  public String getAssignee () {
    return assignee;
  }

  public void setAssignee (String assignee) {
    this.assignee = assignee;
  }
}
