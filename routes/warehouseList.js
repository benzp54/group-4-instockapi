const express = require("express");
const fs = require("fs");
const router = express.Router();
const warehouseData = require("../warehouses.json");
const inventoryData = require("../inventories.json");
const { v4: newId } = require("uuid");
const path = require("path");

const warehouseList = warehouseData.map((value) => ({
  id: value.id,
  name: value.name,
  address: value.address,
  city: value.city,
  country: value.country,
  contact: value.contact,
}));

const inventoryList = inventoryData.map((value) => ({
  id: value.id,
  warehouseID: value.warehouseID,
  warehouseName: value.warehouseName,
  itemName: value.itemName,
  description: value.description,
  category: value.category,
  status: value.status,
  quantity: value.quantity,
}));

//GET request to get warehouse list

router.get("/", (req, res) => {
  res.send(warehouseList);
  console.log("TEST2");
});

router.post("/", (req, res) => {
  let newWarehouse = {
    id: newId(),
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact: req.body.contact,
    position: req.body.position,
    phone: req.body.phone,
    email: req.body.email,
  };

  warehouseData.push(newWarehouse);
  let newData = JSON.stringify(warehouseData);

  fs.writeFileSync(
    path.resolve(__dirname, "../warehouses.json"),
    newData,
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  res.send(newData);
});

//GET inventory list for specific warehouse

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const clickedWarehouse = inventoryList.filter(
    (warehouse) => warehouse.warehouseID === id
  );
  res.send(clickedWarehouse);
});

//GET list of details for specific warehouse

router.get("/warehouse/:id", (req, res) => {
  const { id } = req.params;
  const clickedWarehouse = warehouseList.filter(
    (warehouse) => warehouse.id === id
  );
  res.send(clickedWarehouse);
});

router.delete('/:id',(req,res) => {
    const {id} = req.params
    const deletedWarehouse = warehouseData.find(warehouse => warehouse.id === id);
    if (deletedWarehouse) {
        warehouseData.filter(warehouse => warehouse.id !== id)
        let newList = JSON.stringify(warehouseData)
        
    fs.writeFile(
        path.resolve(__dirname, "../warehouses.json"),
        newList,
        (err) => {
            if (err) {
                console.error(err);
            }
        }
    );
        // res.send(deletedWarehouse);
        res.send(newList)
    } else {
        res
        .status(404)
        .json({message:'Warehouse not found'})

    }
   
})

module.exports = router;
