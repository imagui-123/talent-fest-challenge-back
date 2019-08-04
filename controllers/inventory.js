const Inventory = require('../models/inventory');

exports.getInventories = (req, res) => {
    const inventories = Inventory.find()
    .select("_id product quality quantity status ")
    .then(inventories => {
        res.json(inventories);
    })
    .catch(err => console.log(err));
};

exports.createInventory = (req, res) => {
    const inventory = new Inventory(req.body);
    inventory.save().then(result => {
        res.status(200).json({
            inventory: result
        });
    });
};