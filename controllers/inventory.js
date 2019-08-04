const Inventory = require('../models/inventory');

exports.getInventories = (req, res) => {
    res.json({
        inventories: [{ product: "frijol"}, {product:"arroz" }]
    });
};

exports.createInventory = (req, res) => {
    const inventory = new Inventory(req.body);
    inventory.save((err, result) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.status(200).json({
            inventory: result
        });
    });
};