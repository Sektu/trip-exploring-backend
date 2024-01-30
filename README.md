# Project is available here:

- [Trips exploring backend](https://trips-exploring-backend.netlify.app)

## Trips

[Trips function](https://trips-exploring-backend.netlify.app/.netlify/functions/trips)

u can add params like:

- page
- pageSize

to paginate result

i.e. https://trips-exploring-backend.netlify.app/.netlify/functions/trips?page=2&pageSize=4

## Trip details

[Trip details function](https://trips-exploring-backend.netlify.app/.netlify/functions/trip-details?id=1)

pass id param from trip function to receive trip details

i.e. https://trips-exploring-backend.netlify.app/.netlify/functions/trip-details?id=1

## Local usage
- install netlify globally - `npm install netlify-cli -g`
- run command - `netlify dev`
- trips - http://localhost:8888/.netlify/functions/trips
- trip details - http://localhost:8888/.netlify/function/trip-details?id=1