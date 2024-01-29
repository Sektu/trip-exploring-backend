import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Content-Type": "application/json",
};

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // if (event.httpMethod !== "POST") {
  //   // To enable CORS

  // }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "hello world" }),
    headers,
  };
};

export { handler };
