const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello there')
    console.log('TEST2')
})

module.exports = router;