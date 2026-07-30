const Cart = require("../models/Cartmodels");


const addToCart = async (req, res) => {
    try {
        const { product } = req.body;

        let cartItem = await Cart.findOne({
            user: req.user.id,
            product
        });
        
        //if cart has already there
        if (cartItem) {

            cartItem.quantity += 1;

            await cartItem.save();

            return res.status(200).json({
                message: "Quantity Updated",
                cartItem
            });
        }
        //if cart is empty ye pehle chalega and if will be skiipped
        cartItem = await Cart.create({
            user: req.user.id,
            product,
            quantity: 1
        });

        res.status(201).json({
            message: "Product Added To Cart",
            cartItem
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const viewCart = async (req, res) => {

    try {

        const cart = await Cart.find({
            user: req.user.id
        }).populate("product");

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const updateQuantity = async (req, res) => {

    try {
        const { quantity } = req.body;

        const cart = await Cart.findByIdAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            { quantity },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({
                message: "Cart Item Not Found"
            });
        }

        res.status(200).json({
            message: "Quantity Updated",
            cart
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const removeFromCart = async (req, res) => {

    try {

        const cart = await Cart.findByIdAndDelete(req.params.id);

        if (!cart) {
            return res.status(404).json({
                message: "Cart Item Not Found"
            });
        }

        res.status(200).json({
            message: "Product Removed From Cart"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addToCart,
    viewCart,
    updateQuantity,
    removeFromCart
};