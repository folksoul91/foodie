const express = require("express");
const layouts = require("express-ejs-layouts");

const app = express();

require("dotenv").config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(layouts);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
