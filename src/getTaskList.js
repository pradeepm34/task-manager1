exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log("body", body);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Task List retrieved" }),
  };
};
