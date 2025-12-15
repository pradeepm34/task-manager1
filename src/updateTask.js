const {
  DynamoDBClient,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({});

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const taskId = body.taskId;
  const content = body.content;

  try {
    await client.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          taskId: { S: taskId },
        },
        UpdateExpression: "SET content = :content",
        ExpressionAttributeValues: {
          ":content": { S: content },
        },
        ConditionExpression: "attribute_exists(taskId)",
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task Updated" }),
    };
  } catch (err) {
    // Item does not exist
    if (err.name === "ConditionalCheckFailedException") {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Task not found" }),
      };
    }

    // Unexpected error
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
