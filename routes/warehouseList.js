const express = require('express');
const fs = require('fs');
const router = express.Router();
const warehouseData = require('../warehouses.json')

const warehouseList = warehouseData.map(value => ({
    id: value.id,
    name: value.name,
    address: value.address,
    city: value.city,
    country: value.country,
    contact: value.contact
}))

//GET request to get warehouse list

router.get('/', (req, res) => {
    res.send(warehouseList)
    console.log('TEST2')
})

module.exports = router;