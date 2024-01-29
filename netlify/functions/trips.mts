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
  const tripInfos = tripsJson.map(
    ({ id, title, countries, days, co2kilograms, rating, photoUrl }) => {
      return {
        id,
        title,
        numberOfCountries: countries.length,
        days,
        co2kilograms,
        rating,
        photoUrl,
      };
    }
  );

  const url = new URL(event.rawUrl);
  const pageParam = url.searchParams.get("page") ?? "1";
  const pageSizeParam =
    url.searchParams.get("pageSize") ?? String(tripInfos.length);

  const pageInt = parseInt(pageParam);
  const pageSizeInt = parseInt(pageSizeParam);

  const startIndex = (pageInt - 1) * pageSizeInt;
  const endIndex = pageInt * pageSizeInt;

  const paginatedTripsInfo = tripInfos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tripInfos.length / pageSizeInt);

  return {
    statusCode: 200,
    body: JSON.stringify({ trips: paginatedTripsInfo, totalPages }),
    headers,
  };
};

export { handler };
