const ShopModel = require('../models/shop.js'); // Assuming the path to your shop model is correct

const createShop = async (locationX, locationY, name) => {
    try {
        const shop = new ShopModel({ locationX, locationY, name});
        await shop.save();
        return shop;
    } catch (err) {
        console.error(err);
        return null;
    }
};


const getAllShops = async () => {
    try {
        const shops = await ShopModel.find();
        return shops;
    } catch (err) {
        console.error(err);
        return null;
    }
};


module.exports = {
    createShop,
    getAllShops,
};