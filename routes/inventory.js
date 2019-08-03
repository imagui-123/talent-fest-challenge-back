const express = require('express');
const inventoryController = require('../contollers/inventory');

const router = express.Router();

router.get('/', inventoryController.getInventories);

module.exports = router;


 