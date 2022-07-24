require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const warehousesRoute = require("./routes/warehouseList");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/warehouses", warehousesRoute);
app.use("/warehouses", warehousesRoute);

//GET request to check if the server is running

app.get("/", (req, res) => {
  console.log("TEST");
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("Listening on port 8080");
});
