// Load module and config file
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/global");
require("./config/db").connectDB();
// App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// Cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
app.use(cors());

// Routes
const router = require("./api/routes");
app.get("/", (req, res) => {
  res.send(`<h1>Wellcome<h1>`);
});
app.use("/api", router);

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Connected to port ${port}`));
