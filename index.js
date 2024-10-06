// Functional imports
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./mongoConnect");
const path = require("path");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/userRoute");
const urlRoute = require("./routes/urlRoute");
const redirectRoute = require("./routes/redirectRoute");
const { checkAuth } = require("./middlewares/auth");
// Variables
const app = express();
const PORT = 8000;
// Database connection
connectToMongoDB("mongodb://127.0.0.1:27017/url-final").then(() => {
  console.log("MongoDB Connected");
});
// Services
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Requests
app.use("/", checkAuth, staticRoute);
app.use("/r", checkAuth, redirectRoute);
app.use("/api/users", checkAuth, userRoute);
app.use("/api/url", checkAuth, urlRoute);
// Server console
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
