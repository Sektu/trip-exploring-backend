import type { Context, Config } from "@netlify/functions";
import tripsJson from "../../data/trips.json";

export default async (req: Request, context: Context) => {
  const id = new URL(req.url).searchParams.get("id");

  const trip = tripsJson.find((t) => t.id === parseInt(id ?? ""));

  return context.json(trip);
};
