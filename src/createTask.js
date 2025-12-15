const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({});

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  // use UUID for real project
  const taskId = `${Date.now()} - ${Math.random().toString(36).slice(2)}`;

  await client.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        taskId: { S: taskId },
        content: { S: body.content },
      },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Task created", taskId }),
  };
};
