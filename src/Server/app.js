const express = require("express");
const cors = require("cors");
const app = express();
const port = 8900;
const fs = require("fs");
const restaurantData = JSON.parse(fs.readFileSync("./restaurant.json"));

// Import restaurantData from an external module

const locationData = require("./location.json");
const mealTypeData = require("./mealType.json");

// Set up CORS middleware
app.use(cors());

// Allow requests from your React app's origin
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.get("/getAllLocation", (req, res) => {
  res.send(locationData);
});

app.get("/getAllRestaurants", (req, res) => {
  res.send(restaurantData);
});

app.get("/getAllMealTypes", (req, res) => {
  res.send(mealTypeData);
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Update your /getRestaurantsByLocation route to include error handling
app.get("/getRestaurantsByLocation/:locationId", (req, res) => {
  try {
    const locationId = parseInt(req.params.locationId);
    const filteredRestaurants = restaurantData.restaurants.filter(
      (restaurant) => restaurant.location_id === locationId
    );

    if (filteredRestaurants.length > 0) {
      res.json({
        message: "Restaurants Fetched Successfully",
        restaurants: filteredRestaurants,
      });
    } else {
      res
        .status(404)
        .json({ message: "No restaurants found for this location." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getRestaurantsById/:id", (req, res) => {
  try {
    const restaurantId = req.params.id; // Use req.params.id to get the restaurant ID
    const restaurant = restaurantData.restaurants.find(
      (restaurant) => restaurant._id === restaurantId
    );

    if (restaurant) {
      res.json({ message: "Restaurant Fetched Successfully", restaurant });
    } else {
      res.status(404).json({ message: "Restaurant not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(express.json());
app.post("/filter", (req, res) => {
  let { mealtype, location, cuisine, lcost, hcost, sort, page } = req.body;

  sort = sort ? sort : 1;
  page = page ? page : 1;

  const ItemsPerPage = 2;
  let filterObj = {};
  let startIndex = ItemsPerPage * page - ItemsPerPage;
  let endIndex = ItemsPerPage * page + 1;

  mealtype && (filterObj["mealtype_id"] = mealtype);

  // Modify the filtering condition for mealtype
  if (mealtype) {
    filterObj.mealtype_id = mealtype; // Only apply the filter if mealtype is provided
  }

  location && (filterObj["location_id"] = location);
  cuisine && (filterObj["cuisine_id"] = { $in: cuisine });
  lcost && hcost && (filterObj["min_price"] = { $lte: hcost, $gte: lcost });

  const filteredRestaurants = restaurantData.restaurants
    .filter((restaurant) => {
      if (
        filterObj.mealtype_id &&
        restaurant.mealtype_id !== filterObj.mealtype_id
      ) {
        return false;
      }
      if (
        filterObj.location_id &&
        restaurant.location_id !== filterObj.location_id
      ) {
        return false;
      }
      if (
        filterObj.cuisine_id &&
        !filterObj.cuisine_id.$in.includes(restaurant.cuisine_id)
      ) {
        return false;
      }
      if (filterObj.min_price) {
        if (
          restaurant.min_price < filterObj.min_price.$gte ||
          restaurant.min_price > filterObj.min_price.$lte
        ) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) =>
      sort === 1 ? a.min_price - b.min_price : b.min_price - a.min_price
    );

  // Initialize 'arr' as an empty array
  let arr = [];

  for (var i = 1; i <= Math.ceil(filteredRestaurants.length / ItemsPerPage); i++) {
    arr.push(i);
  }

  const paginatedResponse = filteredRestaurants.slice(startIndex, endIndex);

  res.status(200).json({
    message: "Restaurants Fetched Successfully",
    restaurants: paginatedResponse,
    pageCount: arr,
    currentPage: page,
  });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running on http://localhost:${port}`);
});
