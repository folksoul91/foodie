const express = require("express");
const layouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");

const methodOverride = require("method-override");

const app = express();

require("dotenv").config();

// Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(layouts);

app.use(fileUpload());

// setting the layout
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// setting the route dependency
const routes = require("./server/routes/recipeRoutes.js");
app.use("/", routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
