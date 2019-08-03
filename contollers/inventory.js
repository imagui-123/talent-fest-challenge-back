exports.getInventories = (req, res) => {
    res.json({
        inventories: [{ product: "frijol"}, {product:"arroz" }]
    });
};