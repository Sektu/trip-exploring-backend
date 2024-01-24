import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import data from "./data/trips.json";
import bodyParser from "body-parser";
let cors = require("cors");

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/trip/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const trip = data.find((t) => {
    return t.id === id;
  });

  console.log("trip", trip);
  res.json(trip);
});

app.get(
  "/trips",
  (
    req: Request<
      any,
      any,
      any,
      {
        page: string;
        pageSize: string;
      }
    >,
    res: Response
  ) => {
    const tripsInfo = data.map(
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

    if (!req.query.page) {
      req.query.page = "1";
    }
    if (!req.query.pageSize) {
      req.query.pageSize = String(tripsInfo.length);
    }

    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedTripsInfo = tripsInfo.slice(startIndex, endIndex);

    const totalPages = Math.ceil(tripsInfo.length / pageSize);

    res.json({ trips: paginatedTripsInfo, totalPages });
  }
);

app.get("/", (req, res) => res.json({ answer: 42 }));

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
