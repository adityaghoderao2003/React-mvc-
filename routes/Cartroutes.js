const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");


const {
    addToCart,
    viewCart,
    updateQuantity,
    removeFromCart
} = require("../controllers/Cartcontroller");


router.post("/addtocart", verifyToken, addToCart);
router.get("/viewcart", verifyToken, viewCart);
router.put("/updatecart/:id", verifyToken, updateQuantity);
router.delete("/removecart/:id", verifyToken, removeFromCart);

module.exports = router;