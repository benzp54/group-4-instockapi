const express = require('express');
const fs = require('fs');
const router = express.Router();
const warehouseData = require('../warehouses.json')
const { v4: newId } = require('uuid');
const path = require("path");

const warehouseList = warehouseData.map(value => ({
    id: value.id,
    name: value.name,
    address: value.address,
    city: value.city,
    country: value.country,
    contact: value.contact
}))

router.get('/', (req, res) => {
    res.send(warehouseList)
    console.log('TEST2')
})

router.post('/',(req,res)=> {
    let newWarehouse = {
        "id": newId(),
        "name":req.body.name,
        "address":req.body.address, 
        "city": req.body.city,
        "country": req.body.country,
        "contact": req.body.contact,
        "position": req.body.position,
        "phone": req.body.phone,
        "email":req.body.email
    }

    warehouseData.push(newWarehouse)
    let newData = JSON.stringify(warehouseData)

    fs.writeFileSync(path.resolve(__dirname, "../warehouses.json"), newData, err => {
        if (err) {
            console.error(err);
        }
    })

    res.send(newData)
})

module.exports = router;