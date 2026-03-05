# Assignment 2 — Weather Forecast

 full-stack app (React client + Express/MongoDB server) for fetching and storing weather data using the OpenWeatherMap API.

## Repository layout

- client/ — React frontend (Create React App)
- server/ — Express backend, Mongoose models and routes


## Prerequisites

- Node.js (16+ recommended) and npm
- A MongoDB instance (connection string in `.env`)
- An OpenWeatherMap API key

  <img width="1688" height="1440" alt="image" src="https://github.com/user-attachments/assets/3f0e9512-3a23-4cf3-a360-9e835fef5e37" />



## Environment

Create a `.env` file in the `server/` folder with the following keys:

- `MONGO_URI` — MongoDB connection string
- `WEATHER_API_KEY` — OpenWeatherMap API key
- `PORT` — port for the server (e.g. `5000`)

Example `.env` (do NOT commit this file):

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/weather-db?retryWrites=true&w=majority
WEATHER_API_KEY=your_openweather_api_key_here
PORT=5000
```


## Install

Install dependencies for both server and client.

From the project root:

```
cd server
npm install

cd ../client
npm install
```


## Run

Server

- The server entry file is `server/server.js`. There is no `start` script defined in `server/package.json`, so run it directly:

```
cd server
node server.js
```

Or, during development, use nodemon (already a dependency):

```
cd server
npx nodemon server.js
```

Client

```
cd client
npm start
```

The client is a Create React App and will run on its default port (usually 3000). Make sure the server `PORT` in `.env` does not conflict.


## API endpoints

All backend routes are mounted under `/api/weather`.

- POST /api/weather/fetch/:city
  - Fetch current weather for `:city` from OpenWeatherMap, save/update the record in MongoDB, and return the saved document.
  - Example (replace <city> and adjust host/port):

```
POST http://localhost:5000/api/weather/fetch/london
```

- GET /api/weather/latest
  - Returns the most recent weather document from the DB.

```
GET http://localhost:5000/api/weather/latest
```


## Database model

The `server/models/weather.js` model stores city, temperature, humidity, condition, windSpeed, timeStamp and the full API response. Records are upserted by city.


## Notes and tips

- Ensure `.env` values are correct before starting the server.
- If you get `MongoNetworkError` or connection issues, verify `MONGO_URI` and network access to the MongoDB server.
- The server logs `weatherData` to console when a fetch occurs — check the terminal for details.


## Troubleshooting

- If the React client can't reach the backend, verify the API base URL in the client code and CORS is enabled (server uses `cors()` by default).
- If `WEATHER_API_KEY` is invalid you will get a 4xx error from OpenWeatherMap; verify the key and account.


## Quick checklist for evaluation

- [.env created] — server `.env` contains `MONGO_URI`, `WEATHER_API_KEY`, `PORT`
- [server listening] — `node server.js` prints `Server running on port <PORT>`
- [client running] — `npm start` from `client/` opens app in the browser


---

If you'd like, I can also:

- add a `start` script to `server/package.json` (e.g. `"start": "node server.js"`) and a `dev` script using nodemon
- add a small Postman collection or example curl commands saved in the repo

Tell me which of those you'd like and I'll implement it.
