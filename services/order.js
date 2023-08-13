const orderModel = require('../models/order.js');
const userModel = require('../models/users.js');

const createOrder = async (date, price, userName,products) => {
    try {
        const order = new orderModel({
            date,
            products,
            price,
            userName
        });

        await order.save();
       

        //update user purchase history
        const user = await userModel.findOne({ userName });
        if (!user) {
            console.error(`User with the name:${userName} not found`);
            return null;
        }
        
        user.purchaseHistory.push(order);
        await user.save();

        return order;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getOrderById = async (orderId) => {
    try {
        const order = await orderModel.findOne({ _id:orderId });
        if (!order) {
            console.error(`Order with the id:${orderId} not found`);
            return null;
        }
        return order;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const addProductToOrder = async (orderId,product) => {
    try {
        const order = await orderModel.findOne({ _id:orderId });
        if (!order) {
            console.error(`Order with the id:${orderId} not found`);
            return null;
        }
        order.products.push(product);
        await order.save();
        return order;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const removeProductFromOrder = async (orderId,product) => {
    try {
        const order = await orderModel.findOne({ _id:orderId });
        if (!order) {
            console.error(`Order with the id:${orderId} not found`);
            return null;
        }
        order.products.pop(product);
        await order.save();
        return order;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getAllOrdersByUserName = async (userName) => {
    try {
        const orders = await orderModel.find({ userName });
        if (!orders || orders.length === 0) {
            console.error(`${userName} has no orders`);
            return null;
        }
        return orders;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getAllOrders = async () => {
    try {
        const orders = await orderModel.find();
        if (!orders || orders.length === 0) {
            console.error(`There is no orders`);
            return null;
        }
        return orders;
    } catch (err) {
        console.error(err);
        return null;
    }
};
const groupOrders = async()=> {
    try {
      const ordersByUser = await orderModel.aggregate([
        {
          $group: {
            _id: '$userName',
            orders: { $push: '$$ROOT' },
          },
        },
      ]);
      return ordersByUser;
    } catch (error) {
      return error.message;
    }
  };
module.exports = {
    createOrder,
    getOrderById,
    addProductToOrder,
    removeProductFromOrder,
    getAllOrdersByUserName,
    getAllOrders,
    groupOrders
}