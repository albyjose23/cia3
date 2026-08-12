const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registrationRoutes = require("./routes/registrationRoutes");
const app = express();

app.use(cors());
app.use(express.json());
mongoose
.connect("mongodb://127.0.0.1:27017/registrationDB")
.then(() => console.log("MongoDB Connected"))
.catch((error) => console.log(error));
app.use("/api/events", registrationRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});