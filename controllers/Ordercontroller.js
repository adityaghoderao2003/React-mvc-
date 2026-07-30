const Order = require("../models/Ordermodel");
const Cart = require("../models/Cartmodels");

const placeOrder = async (req, res) => {
    try {

        const cart = await Cart.find({
            user: req.user.id
        }).populate("product");

        if (cart.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is Empty"
            });
        }

         let totalAmount = 0;

        for (const item of cart) {
            totalAmount += item.product.price * item.quantity;
        }
        console.log(totalAmount);
        
        //create order collectionnnnnnnnnn
        const order = await Order.create({
            user: req.user.id,
            products: 
            cart.map((item) => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalAmount
        });
//empty or remove from cart as we want it to be in order page
        await Cart.deleteMany({
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Order Placed",
            order
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const viewOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        }).populate("products.product");

        res.status(200).json({
            success: true,
            orders
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: "Cancelled"
            },
            {
                new: true
            }
        );
  
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Order Cancelled",
            order
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
module.exports = {  placeOrder, viewOrders,cancelOrder};