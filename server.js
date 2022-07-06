const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const dotenv = require("dotenv").config();

//mongodb database URI connection
const db = `${process.env.DB_URI}://${process.env.DB_NAME}:${process.env.DB_PASS}@blog.qmoze.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(db)
  .then((result) => app.listen(3000))
  .catch((err) => console.log("error connecting to database"));

//registering view engine
app.set("view engine", "ejs");

app.use(morgan("dev"));

//middleware & static files i.e. styles and images
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});
