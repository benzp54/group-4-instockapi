const express = require("express");
const fs = require("fs");
const router = express.Router();
const inventories = require("../inventories.json");

const inventoryData = inventories.map((value) => ({
  id: value.id,
  item: value.itemName,
  category: value.category,
  status: value.status,
  quantity: value.quantity,
  warhouseName: value.warehouseName,
}));

router.get("/", (req, res) => {
  res.send(inventoryData);
  console.log("inventory-router");
});

module.exports = router;
