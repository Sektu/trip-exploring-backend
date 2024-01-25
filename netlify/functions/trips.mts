import type { Context, Config } from "@netlify/functions";
import tripsJson from "../../data/trips.json";

export default async (req: Request, context: Context) => {
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

  const url = new URL(req.url);
  const pageParam = url.searchParams.get("page") ?? "1";
  const pageSizeParam =
    url.searchParams.get("pageSize") ?? String(tripInfos.length);

  const pageInt = parseInt(pageParam);
  const pageSizeInt = parseInt(pageSizeParam);

  const startIndex = (pageInt - 1) * pageSizeInt;
  const endIndex = pageInt * pageSizeInt;

  const paginatedTripsInfo = tripInfos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tripInfos.length / pageSizeInt);

  return context.json({ trips: paginatedTripsInfo, totalPages });
};
