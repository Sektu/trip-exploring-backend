import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import tripsJson from "../../data/trips.json";

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
  const id = new URL(event.rawUrl).searchParams.get("id");

  const trip = tripsJson.find((t) => t.id === parseInt(id ?? ""));

  return {
    statusCode: 200,
    body: JSON.stringify(trip),
    headers,
  };
};

export { handler };
