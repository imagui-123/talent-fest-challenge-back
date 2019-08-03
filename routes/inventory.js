const express = require('express');
const inventoryController = require('../controllers/inventory');

const router = express.Router();

router.get('/', inventoryController.getInventories);
router.get('/inventory', inventoryController.createInventory);

module.exports = router;


 