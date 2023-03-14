const express = require("express");
const kmlParser = require("parse-kml");
const geolib = require("geolib");

const app = express();

// Endpoint for finding restaurants
app.get("/restaurants/:location", async (req, res) => {
  try {
    const location = req.params.location;

    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;
    const fetchh = await import("node-fetch");
    const geocodeResponse = await fetchh.default(geocodeUrl, { method: "GET" });

    if (geocodeResponse.ok) {
      const geocodeData = await geocodeResponse.json();

      const coordinates = {
        latitude: geocodeData[0].lat,
        longitude: geocodeData[0].lon,
      };

      // Parse the KML file and filter restaurants by distance
      const kmlData = await kmlParser.toJson("./asset.kml");
      const restaurants = kmlData.features.filter((feature) => {
        const distance = geolib.getDistance(
          coordinates,
          feature.geometry.coordinates
        );
        return distance <= 5000;
      });

      return res.json(restaurants);
    } else {
      console.error("Error getting geocode data:", geocodeResponse.statusText);
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
