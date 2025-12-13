exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  // use UUID for real project
  const taskId = `${Date.now()} - ${Math.random().toString(36).slice(2)}`;

  console.log("body", body);
  console.log("taskId", taskId);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Task created", taskId }),
  };
};
