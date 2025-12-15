const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({});
exports.handler = async (event) => {
  const result = await client.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  const tasks = result.Items.map((i) => ({
    taskId: i.taskId.S,
    content: i.content.S,
  }));

  console.log("tasks", tasks);
  return {
    statusCode: 200,
    body: JSON.stringify(tasks),
  };
};
