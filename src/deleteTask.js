const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const taskId = body.taskId;
  try {
    const command = new DeleteCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        taskId: taskId,
      },

      // Only delete if item exists
      CondtionExpression: "attribute_exists(taskId)",
    });

    const response = await docClient.send(command);
    console.log("response", response);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task Deleted" }),
    };
  } catch (err) {
    if (err.name === "ConditionalCheckFailedException") {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Task not found" }),
      };
    }

    console.error("error deleting task", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
