const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//adding routes
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//setting up MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/POST_WORKOUT";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log(`connected to mongoDB`))
  .catch(err => console.error(`No connection to mongoDB`, err));

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
