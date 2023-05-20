const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//const session = require("express-session");
const userRoutes = require("./routes/user");
const projectRoutes = require("./routes/projects");
//middleware
const helmet = require("helmet");
const morgan = require("morgan");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to sumits cluster"))

  .catch((err) => {
    console.error(err);
  });
app.listen(8000, () => {
  console.log("backend server is running");
});
//midleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
////////////////////////////////////////

// Set up session middleware

// Set up body parser middleware
app.use(express.urlencoded({ extended: true }));

// Set up your static files directory (if needed)
app.use(express.static("public"));

// Set up your views directory and view engine
//app.set("views", "./views");
app.set("view engine", "ejs");

// Use your routes
app.use("/", userRoutes);

//app.get("/issues", userRoutes);
//app.use("/projects", userRoutes.createProject());

const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
const path = require("path");
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/images", express.static(path.resolve(__dirname, "assets/images")));
app.use("/script", express.static(path.resolve(__dirname, "assets/script")));

app.use("/projects/css", express.static(path.resolve(__dirname, "assets/css")));
app.use(
  "/projects/images",
  express.static(path.resolve(__dirname, "assets/images"))
);
app.use(
  "/projects/script",
  express.static(path.resolve(__dirname, "assets/script"))
);
